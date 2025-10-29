import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import landRoutes from "./routes/landRoutes.js"; // ✅ Import your land routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected to South District Real Estate"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🌿 South District Real Estate Backend is Running 🚀");
});

// ✅ Land routes (all APIs start with /api/lands)
app.use("/api/lands", landRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
