import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "@controllers";
import { authMiddleware, validate } from "@middlewares";
import {
  CreateUserRequestSchema,
  DeleteUserRequestSchema,
  GetUserRequestSchema,
  UpdateUserRequestSchema,
} from "colori-platform-shared";
import express from "express";

const router = express.Router();

// User CRUD routes
router.post(
  "/",
  authMiddleware,
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

export default router;
