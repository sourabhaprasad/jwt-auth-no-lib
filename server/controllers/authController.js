// controllers/authController.js
import User from "../models/User.js";
import { RefreshToken } from "../models/RefreshToken.js";
import { hashPassword, verifyPassword } from "../utils/pwd-utils.js";
import { createJWT } from "../utils/jwt-utils.js";
import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from "../config/index.js";
import crypto from "crypto";

export const signup = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "username+password required" });

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: "username taken" });

  const { salt, hash } = hashPassword(password);
  const user = new User({
    username,
    passwordHash: hash,
    salt,
    role: role || "user",
  });
  await user.save();
  res.status(201).json({ ok: true, id: user._id });
};

function genRefreshTokenString() {
  return crypto.randomBytes(64).toString("hex");
}

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const ok = verifyPassword(password, user.salt, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "invalid credentials" });

  // Access token (short lived)
  const accessToken = createJWT(
    { sub: user._id.toString(), role: user.role },
    { expiresIn: ACCESS_TOKEN_EXPIRES }
  );

  // Refresh token (store in DB)
  const rtString = genRefreshTokenString();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES * 1000);
  const rt = new RefreshToken({ token: rtString, user: user._id, expiresAt });
  await rt.save();

  // TODO: Set cookies (httpOnly)
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: ACCESS_TOKEN_EXPIRES * 1000,
    // For localhost dev with Next.js on a different port, allow cross-site cookies
    secure: false, // set true in production behind HTTPS
    sameSite: "lax",
  });
  res.cookie("refresh_token", rtString, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_EXPIRES * 1000,
    secure: false, // set true in production behind HTTPS
    sameSite: "lax",
  });

  res.json({ ok: true });
};

export const refresh = async (req, res) => {
  // read refresh token from cookie
  const rtString = req.cookies?.refresh_token;
  if (!rtString) return res.status(401).json({ error: "no refresh token" });

  const dbRt = await RefreshToken.findOne({ token: rtString }).populate("user");
  if (!dbRt || dbRt.revoked || dbRt.expiresAt < new Date()) {
    return res.status(401).json({ error: "invalid refresh token" });
  }

  // rotate: revoke old, create new
  dbRt.revoked = true;
  await dbRt.save();

  const newRtString = genRefreshTokenString();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES * 1000);
  await RefreshToken.create({
    token: newRtString,
    user: dbRt.user._id,
    expiresAt,
  });

  const accessToken = createJWT(
    { sub: dbRt.user._id.toString(), role: dbRt.user.role },
    { expiresIn: ACCESS_TOKEN_EXPIRES }
  );
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: ACCESS_TOKEN_EXPIRES * 1000,
    sameSite: "lax",
  });
  res.cookie("refresh_token", newRtString, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_EXPIRES * 1000,
    sameSite: "lax",
  });

  res.json({ ok: true });
};

export const logout = async (req, res) => {
  const rtString = req.cookies?.refresh_token;
  if (rtString) {
    await RefreshToken.findOneAndUpdate({ token: rtString }, { revoked: true });
  }
  // clear cookies
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.json({ ok: true });
};
