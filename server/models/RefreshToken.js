// models/RefreshToken.js
import mongoose from "mongoose";
const refreshTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
