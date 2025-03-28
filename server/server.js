import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import itemRoutes from "./API/viewPurchaseOrder.js";
import authRoutes from "./API/authRoutes.js";
import { errorHandler } from "./Middleware/errorHandler.js";
import { notFound } from "./Middleware/notFound.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Enhanced logging: "combined" for production
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/viewOrders", itemRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("MSSQL API is running...");
});

// Error handling
app.use(notFound); // 404 handler
app.use(errorHandler); // Centralized error handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));