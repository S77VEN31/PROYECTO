import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const env = {
  port: process.env.PORT || "3001",
  mongoUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/colori-platform",
  jwtSecret: process.env.JWT_SECRET || "default_jwt_secret",
  nodeEnv: process.env.NODE_ENV || "development",
};

export default env;
