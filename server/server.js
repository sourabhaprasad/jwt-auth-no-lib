import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { PORT } from "./config/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
await db();

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
