// utils/pwd-utils.js
import crypto from "crypto";

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 150_000;
  const keylen = 32;
  const digest = "sha256";
  const derived = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("hex");
  return { salt, hash: derived, iterations, keylen, digest };
}

export function verifyPassword(
  password,
  salt,
  expectedHash,
  iterations = 150000,
  keylen = 32,
  digest = "sha256"
) {
  const derived = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("hex");
  return crypto.timingSafeEqual(
    Buffer.from(derived, "hex"),
    Buffer.from(expectedHash, "hex")
  );
}
