// utils/jwt-utils.js
import crypto from "crypto";
import { JWT_SECRET } from "../config/index.js";

/* base64url helpers */
function b64urlEncode(buf) {
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
function b64urlEncodeStr(str) {
  return b64urlEncode(Buffer.from(str, "utf8"));
}
function b64urlDecodeToStr(s) {
  let b = s.replace(/-/g, "+").replace(/_/g, "/");
  if (b.length % 4 === 2) b += "==";
  else if (b.length % 4 === 3) b += "=";
  return Buffer.from(b, "base64").toString("utf8");
}

function signHS256(message, secret) {
  const h = crypto.createHmac("sha256", secret);
  h.update(message);
  return b64urlEncode(h.digest());
}
function timingSafeEqual(a, b) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  if (A.length !== B.length) return false;
  return crypto.timingSafeEqual(A, B);
}

/** createJWT(payload, opts:{expiresIn}) */
export function createJWT(payload = {}, opts = {}) {
  const header = { alg: "HS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const exp = opts.expiresIn ? iat + opts.expiresIn : undefined;
  const body = { ...payload, iat, ...(exp ? { exp } : {}) };

  const encH = b64urlEncodeStr(JSON.stringify(header));
  const encB = b64urlEncodeStr(JSON.stringify(body));
  const signingInput = `${encH}.${encB}`;
  const sig = signHS256(signingInput, JWT_SECRET);
  return `${signingInput}.${sig}`;
}

/** verifyJWT -> returns payload or throws */
export function verifyJWT(token) {
  if (!token) throw new Error("No token");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed token");
  const [encH, encB, sig] = parts;
  const signingInput = `${encH}.${encB}`;
  const expected = signHS256(signingInput, JWT_SECRET);
  if (!timingSafeEqual(sig, expected)) throw new Error("Invalid signature");
  const payload = JSON.parse(b64urlDecodeToStr(encB));
  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp)
    throw new Error("Token expired");
  return payload;
}
