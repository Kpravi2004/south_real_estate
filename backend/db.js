import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("your-atlas-connection-string", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
