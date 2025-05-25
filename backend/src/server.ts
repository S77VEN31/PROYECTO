import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import env from "./config/env.config";
import { errorMiddleware } from "./middlewares";
import routes from "./routes/index";

// Initialize express application
const app = express();
const PORT = parseInt(env.port, 10);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorMiddleware);

// MongoDB Connection
mongoose
  .connect(env.mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server once DB connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

export default app;
