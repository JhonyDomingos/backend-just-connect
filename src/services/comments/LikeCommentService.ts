import prismaClient from "../../prisma";
import { LikeCommentData } from "../../interfaces/comments/CommentTypes";
import { NotificationService } from "../notifications/NotificationService";

class LikeCommentService {
  async likeComment(
    commentId: string,
    userId: string
  ): Promise<LikeCommentData> {
    const existingLike = await prismaClient.commentLike.findFirst({
      where: {
        comment_id: commentId,
        user_id: userId,
      },
    });

    if (existingLike) {
      throw new Error("Comment already liked by this user");
    }

    const like = await prismaClient.commentLike.create({
      data: {
        comment_id: commentId,
        user_id: userId,
      },
    });

    const comment = await prismaClient.comment.update({
      where: {
        id: commentId,
      },
      data: {
        score: {
          increment: 1,
        },
      },
    });

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    if (userId !== comment.user_id) {
      const notificationService = new NotificationService();
      await notificationService.createNotification({
        userId: comment.user_id,
        type: "likeComment",
        username: `@${user.username}`,
        message: "curtiu seu comentário",
        relatedId: commentId,
      });
    }

    return like;
  }

  async dislikeComment(
    commentId: string,
    userId: string
  ): Promise<LikeCommentData> {
    const existingLike = await prismaClient.commentLike.findFirst({
      where: {
        comment_id: commentId,
        user_id: userId,
      },
    });

    if (!existingLike) {
      throw new Error("Comment not liked by this user");
    }

    await prismaClient.commentLike.delete({
      where: {
        id: existingLike.id,
      },
    });

    await prismaClient.comment.update({
      where: {
        id: commentId,
      },
      data: {
        score: {
          decrement: 1,
        },
      },
    });

    return existingLike;
  }
}

export { LikeCommentService };
