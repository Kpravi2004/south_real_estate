import express from "express";
import Land from "../models/Land.js";

const router = express.Router();

// ✅ Add a new land (POST)
router.post("/", async (req, res) => {
  try {
    const newLand = new Land(req.body);
    await newLand.save();
    res.status(201).json({ message: "Land added successfully!", land: newLand });
  } catch (err) {
    console.error("❌ Error adding land:", err);
    res.status(500).json({ error: "Failed to add land" });
  }
});

// ✅ Get all lands (GET)
router.get("/", async (req, res) => {
  try {
    const lands = await Land.find();
    res.status(200).json(lands);
  } catch (err) {
    console.error("❌ Error fetching lands:", err);
    res.status(500).json({ error: "Failed to fetch lands" });
  }
});

export default router;
