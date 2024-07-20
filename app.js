import express from "express";
import healthRouter from "./src/routes/health.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/health", healthRouter);

export default app;
