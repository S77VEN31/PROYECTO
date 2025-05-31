import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "@controllers";
import { authMiddleware, validate } from "@middlewares";
import {
  CreateUserRequestBodySchema,
  DeleteUserRequestParamsSchema,
  GetUserRequestParamsSchema,
  UpdateUserRequestBodySchema,
  UpdateUserRequestParamsSchema,
} from "colori-platform-shared";
import express from "express";

const router = express.Router();

// User CRUD routes
router.post(
  "/",
  authMiddleware,
  validate(CreateUserRequestBodySchema, "body"),
  createUser
);
router.get("/", authMiddleware, getUsers);
router.get(
  "/:id",
  authMiddleware,
  validate(GetUserRequestParamsSchema, "params"),
  getUserById
);
router.put(
  "/:id",
  authMiddleware,
  validate(UpdateUserRequestParamsSchema, "params"),
  validate(UpdateUserRequestBodySchema, "body"),
  updateUser
);
router.delete(
  "/:id",
  authMiddleware,
  validate(DeleteUserRequestParamsSchema, "params"),
  deleteUser
);

export default router;
