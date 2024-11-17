import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../Error/AppError.error";
import { AuthMessagesEnum } from "../../Error/Enums/AuthMessage.enum";

class AuthMiddleware {
  public static execute = (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError(
        { error: [AuthMessagesEnum.MISSING_AUTHORIZATION_TOKEN] },
        401
      );
    }

    const [_bearer, token] = authorization.split(" ");
    if (!token) {
      throw new AppError(
        { error: [AuthMessagesEnum.INVALID_AUTHORIZATION_TOKEN] },
        401
      );
    }

    const secretKey = process.env.JWT_SECRET!;
    const decodedToken = verify(token, secretKey);

    response.locals = { ...response.locals, decodedToken }; // armazena o token decodificado no response.locals para ser acessado em outros middlewares

    return next();
  };
}
export const authMiddleware = AuthMiddleware.execute;
