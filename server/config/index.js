// config/index.js
export const PORT = process.env.PORT || 4000;
export const JWT_SECRET =
  process.env.JWT_SECRET || "dev_secret_at_least_32_chars"; // set in .env
export const ACCESS_TOKEN_EXPIRES = 15 * 60; // seconds (15 minutes)
export const REFRESH_TOKEN_EXPIRES = 7 * 24 * 60 * 60; // seconds (7 days)
