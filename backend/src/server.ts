import cors from "cors";
import express from "express";
import morgan from "morgan";

import {
  connectDB,
  logger,
  requestLogger,
  setupDatabaseEvents,
} from "./config";
import env from "./config/env.config";
import { errorMiddleware } from "./middlewares";
import routes from "./routes/index";

// Initialize express application
const app = express();
const PORT = parseInt(env.port, 10);

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000", // Frontend development server
    "http://127.0.0.1:3000", // Alternative localhost
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  optionsSuccessStatus: 200, // For legacy browser support
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

// Serve static files from uploads directory
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorMiddleware);

/**
 * Starts the server and connects to database
 */
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDB();
    setupDatabaseEvents();

    // Start server
    app.listen(env.port, () => {
      logger.serverStart(env.port, env.nodeEnv);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
