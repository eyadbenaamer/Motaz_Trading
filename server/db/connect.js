import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export const connectDB = () => {
  try {
    /*MONGOOSE SETUP*/
    mongoose
      .connect(`${process.env.MONGO_URI}/motaz_trading`)
      .catch((error) => {
        console.error("MongoDB connection error:", error);
      });
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
