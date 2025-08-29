// middleware/authenticate.js
import User from "../models/User.js";
import { verifyJWT } from "../utils/jwt-utils.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = verifyJWT(token); // <-- use custom verifyJWT
    const user = await User.findById(decoded.sub); // payload uses "sub" for userId
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

export default authenticate;
