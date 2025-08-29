// middleware/session.js
import { RefreshToken } from "../models/RefreshToken.js";

export const requireAuth = async (req, res, next) => {
  const rtString = req.cookies?.refresh_token;
  if (!rtString) return res.status(401).json({ error: "Not logged in" });

  const rt = await RefreshToken.findOne({ token: rtString }).populate("user");
  if (!rt || rt.revoked || rt.expiresAt < new Date()) {
    return res.status(401).json({ error: "Invalid session" });
  }

  req.user = rt.user; // attach the user to the request
  next();
};
