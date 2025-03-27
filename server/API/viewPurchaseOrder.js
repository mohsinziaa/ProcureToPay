import express from "express";
import { poolPromise, sql } from "../DAL/db.js";
import { verifyToken } from "../Middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("GetPurchaseOrders");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Database query error", error: error.message });
  }  
});

export default router;
