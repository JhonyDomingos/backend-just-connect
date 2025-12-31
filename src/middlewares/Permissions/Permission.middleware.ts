import { NextFunction, Request, Response } from "express";
import { AppError } from "../../Error/AppError.error";
import { AuthMessagesEnum } from "../../Error/Enums/AuthMessage.enum";
import { prismaClient } from "../../prisma";

export class PermissionsMiddleware {
  async canEditPost(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decodedToken.sub;
    const postId = req.params.id;

    const post = await prismaClient.post.findUnique({
      where: { id: postId },
      select: { user_id: true },
    });

    const isPostAuthor = post?.user_id === userId;

    if (!isPostAuthor) {
      throw new AppError(
        { error: [AuthMessagesEnum.INSSUFFICIENT_PERMISSION] },
        403
      );
    }

    next();
  }
  async canEditComment(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decodedToken.sub;
    const commentId = req.params.id;

    const comment = await prismaClient.post.findUnique({
      where: { id: commentId },
      select: { user_id: true },
    });

    const isCommentAutor = comment?.user_id === userId;

    if (!isCommentAutor) {
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

    const isCommentAutor = post?.user_id === userId;
    const isAdmin = userRole.toUpperCase() === "ADMIN";

    if (!isCommentAutor && !isAdmin) {
      throw new AppError(
        { error: [AuthMessagesEnum.INSSUFFICIENT_PERMISSION] },
        403
      );
    }

    next();
  }
  async canAdministerComment(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decodedToken.sub;
    const userRole = res.locals.decodedToken.role;
    const commentId = req.params.id;

    const comment = await prismaClient.comment.findUnique({
      where: { id: commentId },
      select: { user_id: true },
    });

    const isCommentAuthor = comment?.user_id === userId;
    const isAdmin = userRole.toUpperCase() === "ADMIN";

    if (!isCommentAuthor && !isAdmin) {
      throw new AppError(
        { error: [AuthMessagesEnum.INSSUFFICIENT_PERMISSION] },
        403
      );
    }

    next();
  }
}

export const permissionsMiddleware = new PermissionsMiddleware();
