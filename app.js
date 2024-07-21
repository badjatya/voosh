// Libraries
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routers
import healthRouter from "./src/routes/health.js";
import authRouter from "./src/routes/auth.js";

const app = express();

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// Routes
app.use("/health", healthRouter);
app.use("/api/v1/auth", authRouter);

export default app;
