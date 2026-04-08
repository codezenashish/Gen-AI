import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(
      "🔐 Token Received:",
      token ? "✓ Token मिला" : "✗ Token नहीं मिला"
    );

    if (!token) {
      throw new ApiError(401, "unauthorized request - token not provided");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("✅ Token Verified Successfully");

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Token Verification Error:", error?.message);
    throw new ApiError(401, error?.message || "invalid access token");
  }
});
