import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../Error/AppError.error";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
import { logger } from "../../log/logger";

class HandleErrors {
  public static execute = (
    error: unknown,
    request: Request,
    response: Response,
    __: NextFunction
  ) => {
    const requestInfo = {
      method: request.method,
      path: request.path,
      ip: request.ip,
      userAgent: request.get("user-agent"),
      userId: (request as any).userId || "anonymous",
    };
    if (error instanceof AppError) {
      logger.warn(`[HandleErrors] Application error occurred`, {
        ...requestInfo,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
      });
      return response.status(error.statusCode).json({
        message: error.errors || { general: [error.message] },
      });
    }

    if (error instanceof ZodError) {
      logger.warn(`[HandleErrors] Validation error occurred`, {
        ...requestInfo,
        statusCode: 400,
        validationErrors: error.flatten().fieldErrors,
      });
      return response
        .status(400)
        .json({ message: error.flatten().fieldErrors });
    }

    if (error instanceof JsonWebTokenError) {
      logger.warn(`[HandleErrors] JWT authentication error`, {
        ...requestInfo,
        statusCode: 401,
        message: error.message,
      });
      return response.status(400).json({ message: error.message });
    }

    logger.error(`[HandleErrors] Unhandled error occurred`, {
      ...requestInfo,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      errorType: error?.constructor?.name || typeof error,
    } as any);

    return response.status(500).json({
      message: "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && {
        error: error instanceof Error ? error.message : error,
      }),
    });
  };
}

export { HandleErrors };
