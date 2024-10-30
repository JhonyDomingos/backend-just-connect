import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * @function validateSchema
 * @description Middleware function to validate request body against a Zod schema. 
 * If validation succeeds, it proceeds to the next middleware; 
 * if it fails, it returns a 400 status with error details or a 500 status for unexpected errors.
 * 
 * @param {AnyZodObject} schema - The Zod schema to validate the request body against.
 * @returns {Function} A middleware function for Express.js.
 */
export const validateSchema = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};