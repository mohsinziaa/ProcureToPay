import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import itemRoutes from "./API/viewPurchaseOrder.js";
import authRoutes from "./API/authRoutes.js";

import { errorHandler } from "./Middleware/errorHandler.js";
import { logger } from "./Middleware/logger.js";
import { notFound } from "./Middleware/notFound.js";

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/viewOrders", itemRoutes);

app.get("/", (req, res) => {
  res.send("MSSQL API is running...");
});

// Handle 404 errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
