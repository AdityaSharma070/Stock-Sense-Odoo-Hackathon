import { ApiError } from "../utils/ApiError.js";

export const verifyRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    throw new ApiError(403, "Access denied — insufficient permissions");
  }
  next();
};