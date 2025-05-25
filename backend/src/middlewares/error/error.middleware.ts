import { NextFunction, Request, Response } from "express";

class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }

  // For ZodErrors or other validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }

  // Default to 500 server error
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const createApiError = (statusCode: number, message: string) => {
  return new ApiError(statusCode, message);
};

export { ApiError };
