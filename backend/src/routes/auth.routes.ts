/**
 * Authentication routes
 * Handles login, logout, and authentication-related endpoints
 */

import { login, logout } from "@controllers";
import { authMiddleware, validate } from "@middlewares";
import { LoginRequestSchema } from "colori-platform-shared";
import express from "express";

const router = express.Router();

/**
 * POST /auth/login
 * Authenticate user with email and password
 */
router.post("/login", validate(LoginRequestSchema, "body"), login);

/**
 * POST /auth/logout
 * Logout current authenticated user
 */
router.post("/logout", authMiddleware, logout);

/**
 * GET /auth/me
 * Get current authenticated user information
 */
router.get("/me", authMiddleware, (req, res) => {
  // The authMiddleware should populate req.user
  if (req.user) {
    res.json({
      success: true,
      data: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      error: "User not authenticated",
    });
  }
});

export default router;
