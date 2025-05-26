/**
 * User controller implementation
 * Handles CRUD operations and authentication for user entities
 */

import { UserService } from "@services";
import {
  ApiResponse,
  CreateResponse,
  DeleteResponse,
  DeleteUserRequestParams,
  GetUserRequestParams,
  LoginRequest,
  UpdateResponse,
  UpdateUserRequest,
  UpdateUserRequestParams,
} from "colori-platform-shared";
import { Request, Response } from "express";

/**
 * Get all users with optional pagination and filtering
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, role } = req.query;

    const options = {
      page: Number(page),
      limit: Number(limit),
      search: search as string,
      role: role as string,
    };

    const result = await UserService.findAll(options);

    return res.status(200).json({
      success: true,
      users: result.results,
      total: result.total,
      page: result.page,
      limit: result.limit,
      pages: result.pages,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve users",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Get a single user by ID
 */
export const getUserById = async (
  req: Request<GetUserRequestParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const user = await UserService.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      data: user,
    } as ApiResponse<typeof user>);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve user",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Create a new user
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, description } = req.body;

    const newUser = await UserService.create({
      name,
      email,
      password,
      role,
      description,
    });

    return res.status(201).json({
      success: true,
      id: newUser.id,
      data: newUser,
    } as ApiResponse<typeof newUser> & CreateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to create user",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Update an existing user
 */
export const updateUser = async (
  req: Request<UpdateUserRequestParams, any, UpdateUserRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    // Get user ID from authenticated request
    const updaterId = req.user?.id;

    const existingUser = await UserService.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      } as ApiResponse);
    }

    const updatedUser = await UserService.update(id, {
      ...user,
    });

    return res.status(200).json({
      success: true,
      updated: true,
      data: updatedUser,
    } as ApiResponse<typeof updatedUser> & UpdateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to update user",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Delete a user by ID
 */
export const deleteUser = async (
  req: Request<DeleteUserRequestParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const existingUser = await UserService.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      } as ApiResponse);
    }

    await UserService.delete(id);

    return res.status(200).json({
      success: true,
      deleted: true,
    } as ApiResponse & DeleteResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete user",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginRequest;

    const { user, token } = await UserService.authenticate(email, password);

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      error: "Authentication failed",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Logout a user
 */
export const logout = async (req: Request, res: Response) => {
  try {
    // For token-based auth, the client typically just discards the token
    // But we could implement token blacklisting here if needed

    return res.status(200).json({
      success: true,
    } as ApiResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Logout failed",
      message: error.message,
    } as ApiResponse);
  }
};
