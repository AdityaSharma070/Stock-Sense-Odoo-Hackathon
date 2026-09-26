import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendOTPEmail } from "../utils/mailer.js";

// ── helpers ──────────────────────────────────────────────
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
  return { accessToken, refreshToken };
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// ── POST /api/v1/auth/register ───────────────────────────
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    throw new ApiError(400, "Name, email and password are required");

  const existing = await prisma.users.findUnique({ where: { email } });
  if (existing) throw new ApiError(409, "Email already registered");

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashed,
      role: role === "manager" ? "manager" : "staff",
    },
    select: { id: true, name: true, email: true, role: true },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

// ── POST /api/v1/auth/login ──────────────────────────────
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(400, "Email and password are required");

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = generateTokens(user);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: { id: user.id, name: user.name, email: user.email, role: user.role },
          accessToken,
        },
        "Login successful"
      )
    );
});

// ── POST /api/v1/auth/logout ─────────────────────────────
const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

// ── POST /api/v1/auth/refresh-token ─────────────────────
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingToken) throw new ApiError(401, "No refresh token");

  let decoded;
  try {
    decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await prisma.users.findUnique({ where: { id: decoded.id } });
  if (!user) throw new ApiError(401, "User not found");

  const { accessToken } = generateTokens(user);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, { accessToken }, "Token refreshed"));
});

// ── POST /api/v1/auth/forgot-password ───────────────────
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email is required");

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "No account with this email");

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otp_expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.users.update({
    where: { email },
    data: { otp, otp_expires },
  });

  await sendOTPEmail(email, otp);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP sent to your email"));
});

// ── POST /api/v1/auth/verify-otp ────────────────────────
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "User not found");

  if (user.otp !== otp) throw new ApiError(400, "Invalid OTP");
  if (!user.otp_expires || user.otp_expires < new Date())
    throw new ApiError(400, "OTP has expired");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP verified successfully"));
});

// ── POST /api/v1/auth/reset-password ────────────────────
const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword)
    throw new ApiError(400, "Email, OTP and new password are required");

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "User not found");

  if (user.otp !== otp) throw new ApiError(400, "Invalid OTP");
  if (!user.otp_expires || user.otp_expires < new Date())
    throw new ApiError(400, "OTP has expired");

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.users.update({
    where: { email },
    data: {
      password: hashed,
      otp: null,
      otp_expires: null,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword,
  verifyOTP,
  resetPassword,
};