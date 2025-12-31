import {
  CreateCommentData,
  ReturnCommentData,
} from "../../interfaces/comments/CommentTypes";
import { prismaClient } from "../../prisma";
import { commentSchema } from "../../schemas/commentSchemas";
import { showNotificationSchema } from "../../schemas/notificationSchemas";
import { NotificationService } from "../notifications/NotificationService";
import { SSEService } from "../notifications/SSEService";

class CommentCreateService {
  /**
   * Creates a new comment in the database.
   *
   * @param {CreateCommentData} data - The data for the comment being created.
   * @param {string} userId - The ID of the user creating the comment.
   * @returns {Promise<ReturnCommentData>} - A promise that resolves to the created comment data.
   *
   * @throws {Error} - Throws an error if the comment creation fails.
   */
  async create(
    data: CreateCommentData,
    userId: string,
    postId: string
  ): Promise<ReturnCommentData> {
    const comment = await prismaClient.comment.create({
      data: {
        user_id: userId,
        post_id: postId,
        comment: data.comment,
      },
    });

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    const postOwner = await prismaClient.post.findUnique({
      where: { id: postId },
      select: { user_id: true },
    });
    if (!postOwner) {
      throw new Error("Post not found");
    }
    if (!user) {
      throw new Error("User not found");
    }
    if (userId !== postOwner.user_id) {
      const notificationService = new NotificationService();

      const notification = await notificationService.createNotification({
        user_id: postOwner.user_id,
        type: "comment",
        username: `${user.username}`,
        message: "comentou em seu post",
        related_id: postId,
      });

      SSEService.sendNotificationToUser(
        showNotificationSchema.parse(notification)
      );
    }

    return commentSchema.parse(comment);
  }
}

export { CommentCreateService };
