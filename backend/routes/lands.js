import express from "express";
import Land from "../models/Land.js";
const router = express.Router();

// GET all lands
router.get("/", async (req, res) => {
  try {
    const lands = await Land.find();
    res.json(lands);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new land
router.post("/", async (req, res) => {
  try {
    const newLand = new Land(req.body);
    await newLand.save();
    res.status(201).json(newLand);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
