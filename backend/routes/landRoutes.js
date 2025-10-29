import express from "express";
import multer from "multer";
import path from "path";
import Land from "../models/Land.js";

const router = express.Router();

// Storage config for images and videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "uploads/images/");
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, "uploads/videos/");
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Add new land (multiple images + one video)
router.post(
  "/add",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { land_type, district, taluk, land_size, price, status, description } = req.body;

      const imagePaths = req.files["images"]
        ? req.files["images"].map((file) => `/uploads/images/${file.filename}`)
        : [];

      const videoPath = req.files["video"]
        ? `/uploads/videos/${req.files["video"][0].filename}`
        : "";

      const newLand = new Land({
        land_type,
        district,
        taluk,
        land_size,
        price,
        status,
        images: imagePaths,
        video: videoPath,
        description,
      });

      await newLand.save();
      res.status(201).json({ message: "Land added successfully", land: newLand });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding land", error });
    }
  }
);

// ✅ Get all lands
router.get("/", async (req, res) => {
  try {
    const lands = await Land.find();
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lands", error });
  }
});

export default router;
