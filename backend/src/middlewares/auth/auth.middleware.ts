import { env } from "@config";
import { ApiError } from "@middlewares";
import { JwtPayload, UserRole } from "colori-platform-shared";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Tipo interno para manejar la conversión segura
interface DecodedToken {
  id?: string;
  userId: string;
  email: string;
  role: string;
}

/**
 * Middleware to verify JWT token
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1];

    // Decodificar el token
    const decodedToken = jwt.verify(token, env.jwtSecret) as DecodedToken;

    // Asegurar que tenga todas las propiedades necesarias para JwtPayload
    const jwtPayload: JwtPayload = {
      ...decodedToken,
      id: decodedToken.id || decodedToken.userId, // Usar userId como id si no hay id
    };

    req.user = jwtPayload;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, "Invalid token"));
    } else {
      next(error);
    }
  }
};

/**
 * Middleware to check if user has required role
 */
export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Not authenticated"));
    }

    const userRole = req.user.role as UserRole;
    if (!roles.includes(userRole)) {
      return next(
        new ApiError(403, "You don't have permission to access this resource")
      );
    }

    next();
  };
};
