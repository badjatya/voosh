import express from "express";
import healthRouter from "./src/routes/health.js";

const app = express();

app.use("/health", healthRouter);

export default app;
