import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb+srv://esmin53:Esmin.2021@emarketplace.5cydv.mongodb.net/emarketplace?retryWrites=true&w=majority", {

      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
