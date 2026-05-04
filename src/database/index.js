import mongoose from "mongoose";
import { config } from "../config/config.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.dbUrl, {
      dbName: "seminorhub",
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
