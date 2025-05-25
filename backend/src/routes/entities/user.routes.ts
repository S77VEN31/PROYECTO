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
router.post("/", authMiddleware, validate(CreateUserRequestSchema), createUser);
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, validate(GetUserRequestSchema), getUserById);
router.put(
  "/:id",
  authMiddleware,
  validate(UpdateUserRequestSchema),
  updateUser
);
router.delete(
  "/:id",
  authMiddleware,
  validate(DeleteUserRequestSchema),
  deleteUser
);

// Auth routes
router.post("/login", validate(LoginRequestSchema), login);
router.post("/logout", authMiddleware, logout);

export default router;
