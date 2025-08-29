import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { PORT } from "./config/index.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://jwt-auth-no-lib.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

dotenv.config();

app.use(express.json());
app.use(cookieParser());
await db();

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
