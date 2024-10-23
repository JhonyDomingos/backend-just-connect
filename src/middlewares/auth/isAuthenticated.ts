import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "../../interfaces/auth/Payload";
import { AppError } from "../../Error/AppError.error";

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError("Token is missing", 401);
  }

  const [, token] = authToken.split(" ");
  if (!token) {
    throw new AppError("Token is missing", 401);
  }

  const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

  request.user_id = sub;

  return next();
}

