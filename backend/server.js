import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import landRoutes from "./routes/landRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// MongoDB 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Routes
app.use("/api/lands", landRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
