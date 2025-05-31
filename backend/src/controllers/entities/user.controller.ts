/**
 * User controller implementation
 * Handles CRUD operations and authentication for user entities
 */

import { UserService } from "@services";
import {
  ApiResponse,
  CreateUserRequestBody,
  CreateUserResponse,
  DeleteUserRequestParams,
  DeleteUserResponse,
  GetUserRequestParams,
  GetUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  LoginRequest,
  UpdateUserRequestBody,
  UpdateUserRequestParams,
  UpdateUserResponse,
} from "colori-platform-shared";
import { Request, Response } from "express";

/**
 * Get all users with optional pagination and filtering
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Query parameters are already validated by middleware
    const filterParams = req.query as GetUsersRequest;

    const result = await UserService.findAll(filterParams);

    return res.status(200).json({
      success: true,
      data: result,
    } as GetUsersResponse);
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
export const getUserById = async (req: Request, res: Response) => {
  try {
    const params = req.params as unknown as GetUserRequestParams;

    const user = await UserService.findById(params);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      data: user,
    } as GetUserResponse);
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
    const userData = req.body as CreateUserRequestBody;

    // Use provided firstName/lastName or extract from name
    let userFirstName = userData.firstName;
    let userLastName = userData.lastName;

    if (!userFirstName) {
      const nameParts = userData.name.trim().split(" ");
      userFirstName = nameParts[0] || "";
      userLastName = userLastName || nameParts.slice(1).join(" ") || "";
    }

    // Ensure we have at least a firstName
    if (!userFirstName) {
      return res.status(400).json({
        success: false,
        error: "First name is required",
        message:
          "First name must be provided either directly or extractable from name field",
      } as ApiResponse);
    }

    const createData = {
      ...userData,
      firstName: userFirstName,
      lastName: userLastName,
      description: userData.description || `User profile for ${userData.name}`,
    };

    const newUser = await UserService.create(createData);

    return res.status(201).json({
      success: true,
      id: newUser.id,
      data: createData,
    } as CreateUserResponse);
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
export const updateUser = async (req: Request, res: Response) => {
  try {
    const params = req.params as unknown as UpdateUserRequestParams;
    const updateData = req.body as UpdateUserRequestBody;

    const existingUser = await UserService.findById(params);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      } as ApiResponse);
    }

    await UserService.update(params, updateData);

    return res.status(200).json({
      success: true,
      updated: true,
      data: updateData,
    } as UpdateUserResponse);
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
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const params = req.params as unknown as DeleteUserRequestParams;

    const existingUser = await UserService.findById(params);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      } as ApiResponse);
    }

    await UserService.delete(params);

    return res.status(200).json({
      success: true,
      deleted: true,
    } as DeleteUserResponse);
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
    const credentials = req.body as LoginRequest;

    const { user, token } = await UserService.authenticate(credentials);

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
