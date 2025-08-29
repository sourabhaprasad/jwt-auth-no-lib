// middleware/authorize.js
export const authorize = (requiredRole) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "not authenticated" });
  if (requiredRole === "any") return next();
  if (req.user.role === requiredRole || req.user.role === "admin")
    return next();
  return res.status(403).json({ error: "forbidden" });
};
