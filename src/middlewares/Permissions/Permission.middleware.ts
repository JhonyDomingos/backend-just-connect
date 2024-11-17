import { Request, Response, NextFunction } from "express";
import prismaClient from "../../prisma";
import { AppError } from "../../Error/AppError.error";
import { AuthMessagesEnum } from "../../Error/Enums/AuthMessage.enum";

export class PermissionsMiddleware {
  async canEditPost(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decodedToken.sub;
    const postId = req.params.id;

    const post = await prismaClient.post.findUnique({
      where: { id: postId },
      select: { user_id: true },
    });

    const isPostAuthor = post.user_id === userId;

    if (!isPostAuthor) {
      throw new AppError(
        { error: [AuthMessagesEnum.INSSUFFICIENT_PERMISSION] },
        403
      );
    }

    next();
  }

  async canAdministerPost(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decodedToken.sub;
    const userRole = res.locals.decodedToken.role;
    const postId = req.params.id;

    const post = await prismaClient.post.findUnique({
      where: { id: postId },
      select: { user_id: true },
    });

    const isPostAuthor = post.user_id === userId;
    const isAdmin = userRole.toUpperCase() === "ADMIN";

    if (!isPostAuthor && !isAdmin) {
      throw new AppError(
        { error: [AuthMessagesEnum.INSSUFFICIENT_PERMISSION] },
        403
      );
    }

    next();
  }
}

export const permissionsMiddleware = new PermissionsMiddleware();
