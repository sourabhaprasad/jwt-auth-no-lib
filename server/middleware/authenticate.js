// middleware/authenticate.js
import { RefreshToken } from "../models/RefreshToken.js";

export default async function authenticate(req, res, next) {
  try {
    const rtString = req.cookies?.refresh_token;
    if (!rtString) return res.status(401).json({ error: "Not logged in" });

    const token = await RefreshToken.findOne({ token: rtString }).populate("user");
    if (!token || token.revoked || token.expiresAt < new Date()) {
      return res.status(401).json({ error: "Invalid session" });
    }

    req.user = token.user; // attach user to request
    next();
  } catch (err) {
    res.status(500).json({ error: "Authentication failed" });
  }
}
