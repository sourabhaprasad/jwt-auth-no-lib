import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { PORT } from "./config/index.js";

dotenv.config();

const app = express();

// Determine environment
const isProduction = process.env.NODE_ENV === "production";

// Allowed origins
const allowedOrigins = isProduction
  ? ["https://jwt-auth-no-lib.vercel.app"]
  : ["http://localhost:3000", "http://localhost:4000"];

// CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
await db();

app.get("/", (req, res) => {
  console.log("working");
});

// Routes
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} | ENV: ${process.env.NODE_ENV}`)
);
