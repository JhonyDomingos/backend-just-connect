import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../Error/AppError.error";

class AuthMiddleware {
  public static execute = (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError("Token is missing", 401);
    }

    const [_bearer, token] = authorization.split(" ");
    if (!token) {
      throw new AppError("Token is invalid", 401);
    }

    const secretKey = process.env.JWT_SECRET!;
    const decodedToken = verify(token, secretKey);

    response.locals = { ...response.locals, decodedToken }; // armazena o token decodificado no response.locals para ser acessado em outros middlewares
   

    return next();

  };
}
export const authMiddleware = AuthMiddleware.execute;