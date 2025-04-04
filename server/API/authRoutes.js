import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication (Replace with actual DB verification)
  if (username === "admin" && password === "12345") { 
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentialss" });
  }
});

export default router;