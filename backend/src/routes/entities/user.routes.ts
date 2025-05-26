import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
  logout,
  updateUser,
} from "@controllers";
import { authMiddleware, validate } from "@middlewares";
import {
  CreateUserRequestSchema,
  DeleteUserRequestSchema,
  GetUserRequestSchema,
  LoginRequestSchema,
  UpdateUserRequestSchema,
} from "colori-platform-shared";
import express from "express";

const router = express.Router();

// User CRUD routes
router.post(
  "/",
  // authMiddleware, // Temporarily disabled for initial user creation
  validate(CreateUserRequestSchema, "body"),
  createUser
);
router.get("/", authMiddleware, getUsers);
router.get(
  "/:id",
  authMiddleware,
  validate(GetUserRequestSchema, "params"),
  getUserById
);
router.put(
  "/:id",
  authMiddleware,
  validate(GetUserRequestSchema, "params"),
  validate(UpdateUserRequestSchema, "body"),
  updateUser
);
router.delete(
  "/:id",
  authMiddleware,
  validate(DeleteUserRequestSchema, "params"),
  deleteUser
);

// Auth routes
router.post("/login", validate(LoginRequestSchema, "body"), login);
router.post("/logout", authMiddleware, logout);

export default router;
