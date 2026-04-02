import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

/*
------------------------------------------------
PASSWORD HASHING MIDDLEWARE
------------------------------------------------
*/
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});
/*
------------------------------------------------
PASSWORD VALIDATION METHOD
------------------------------------------------
*/
userSchema.methods.isPasswordValid = async function compareUser(plainTextPass) {
  return bcrypt.compare(plainTextPass, this.password);
};

/*
------------------------------------------------
ACCESS TOKEN GENERATION
------------------------------------------------
*/
userSchema.methods.generateAccessToken = function createAccessToken() {
  const tokenPayload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  };
  return jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
/*
-----------------------------------------------
REFRESH TOKEN GENERATION
------------------------------------------------
*/
userSchema.methods.generateRefreshToken = function createRefreshToken() {
  const tokenPayload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  };

  return jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model("user", userSchema);
