import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

/**
 * Middleware to validate request body, params or query with Zod schemas
 * @param schema - The Zod schema for request validation
 * @param target - What part of the request to validate ('body', 'params', 'query', or 'all')
 */
export const validate = (
  schema: any,
  target: "body" | "params" | "query" | "all" = "all"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let dataToValidate;

      switch (target) {
        case "body":
          dataToValidate = req.body;
          break;
        case "params":
          dataToValidate = req.params;
          break;
        case "query":
          dataToValidate = req.query;
          break;
        case "all":
        default:
          dataToValidate = {
            body: req.body,
            query: req.query,
            params: req.params,
          };
          break;
      }

      await schema.parseAsync(dataToValidate);
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
