import mongoose from "mongoose";
import { env } from "./env.config";
import { logger } from "./logger.config";

/**
 * Connects to MongoDB database using the configured URI
 *
 * @returns {Promise<void>} Promise that resolves when connection is established
 * @throws {Error} When connection fails
 *
 * @example
 * // Connect to database
 * await connectDB();
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.success("MongoDB connected successfully");
    logger.info(`Connected to: ${env.mongoUri}`);
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

/**
 * Handles MongoDB connection events and logs them appropriately
 */
export const setupDatabaseEvents = (): void => {
  mongoose.connection.on("connected", () => {
    logger.success("Mongoose connected to MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    logger.error("Mongoose connection error:", error);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("Mongoose disconnected from MongoDB");
  });

  // Graceful shutdown
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed through app termination");
    process.exit(0);
  });
};
