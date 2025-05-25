import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

/**
 * Middleware to validate request body, params or query with Zod schemas
 * @param schema - The Zod schema for request validation
 */
export const validate = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      next(error);
    }
  };
};
