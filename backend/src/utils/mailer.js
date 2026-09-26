import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"StockSense" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your StockSense OTP",
    html: `
      <h2>Password Reset OTP</h2>
      <p>Your OTP is: <strong style="font-size:24px">${otp}</strong></p>
      <p>This OTP expires in <strong>10 minutes</strong>.</p>
      <p>If you did not request this, ignore this email.</p>
    `,
  });
};