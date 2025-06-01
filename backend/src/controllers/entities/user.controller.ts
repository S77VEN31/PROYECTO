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
  GetUsersRequestParams,
  GetUsersResponse,
  LoginRequest,
  LoginResponse,
  UpdateUserRequestBody,
  UpdateUserRequestParams,
  UpdateUserResponse,
} from "colori-platform-shared";
import { Request, Response } from "express";

/**
 * Get all users with optional pagination and filtering
 */
export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const filterParams = req.query as GetUsersRequestParams;
    const result = await UserService.findAll(filterParams);

    const response: GetUsersResponse = {
      success: true,
      data: result,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: GetUsersResponse = {
      success: false,
      error: "Failed to retrieve users",
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

/**
 * Get a single user by ID
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params = req.params as unknown as GetUserRequestParams;
    const user = await UserService.findById(params);

    if (!user) {
      const response: GetUserResponse = {
        success: false,
        error: "User not found",
      };
      return res.status(404).json(response);
    }

    const response: GetUserResponse = {
      success: true,
      data: user,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: GetUserResponse = {
      success: false,
      error: "Failed to retrieve user",
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

/**
 * Create a new user
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
      const response: CreateUserResponse = {
        success: false,
        error: "First name is required",
        message:
          "First name must be provided either directly or extractable from name field",
        id: "",
      };
      return res.status(400).json(response);
    }

    const createData = {
      ...userData,
      firstName: userFirstName,
      lastName: userLastName,
      description: userData.description || `User profile for ${userData.name}`,
    };

    const newUser = await UserService.create(createData);

    const response: CreateUserResponse = {
      success: true,
      id: newUser.id,
      data: createData,
    };
    return res.status(201).json(response);
  } catch (error: any) {
    const response: CreateUserResponse = {
      success: false,
      error: "Failed to create user",
      message: error.message,
      id: "",
    };
    return res.status(500).json(response);
  }
};

/**
 * Update an existing user
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params = req.params as unknown as UpdateUserRequestParams;
    const updateData = req.body as UpdateUserRequestBody;

    const existingUser = await UserService.findById(params);

    if (!existingUser) {
      const response: UpdateUserResponse = {
        success: false,
        error: "User not found",
        updated: false,
      };
      return res.status(404).json(response);
    }

    await UserService.update(params, updateData);

    const response: UpdateUserResponse = {
      success: true,
      updated: true,
      data: updateData,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: UpdateUserResponse = {
      success: false,
      error: "Failed to update user",
      message: error.message,
      updated: false,
    };
    return res.status(500).json(response);
  }
};

/**
 * Delete a user by ID
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params = req.params as unknown as DeleteUserRequestParams;

    const existingUser = await UserService.findById(params);

    if (!existingUser) {
      const response: DeleteUserResponse = {
        success: false,
        error: "User not found",
        deleted: false,
      };
      return res.status(404).json(response);
    }

    await UserService.delete(params);

    const response: DeleteUserResponse = {
      success: true,
      deleted: true,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: DeleteUserResponse = {
      success: false,
      error: "Failed to delete user",
      message: error.message,
      deleted: false,
    };
    return res.status(500).json(response);
  }
};

/**
 * Login a user
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const credentials = req.body as LoginRequest;
    const { user, token } = await UserService.authenticate(credentials);

    const response: LoginResponse = {
      token,
      user,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const errorResponse: ApiResponse = {
      success: false,
      error: "Authentication failed",
      message: error.message,
    };
    return res.status(401).json(errorResponse);
  }
};

/**
 * Logout a user
 */
export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // For token-based auth, the client typically just discards the token
    // But we could implement token blacklisting here if needed

    const response: ApiResponse = {
      success: true,
      message: "Logged out successfully",
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      error: "Logout failed",
      message: error.message,
    };
    return res.status(500).json(response);
  }
};
