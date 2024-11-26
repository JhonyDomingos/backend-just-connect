import prismaClient from "../../prisma";
import { LikePostData } from "../../interfaces/post/PostType";
import { NotificationService } from "../notifications/NotificationService";

class LikePostService {
  async likePost(postId: string, userId: string): Promise<LikePostData> {
    const existingLike = await prismaClient.postLike.findFirst({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });

    if (existingLike) {
      throw new Error("Post already liked by this user");
    }

    const like = await prismaClient.postLike.create({
      data: {
        post_id: postId,
        user_id: userId,
      },
    });

    const post = await prismaClient.post.update({
      where: {
        id: postId,
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

    if (userId !== post.user_id) {
      const notificationService = new NotificationService();
      await notificationService.createNotification({
        userId: post.user_id,
        type: "likePost",
        username: `@${user.username}`,
        message: "curtiu seu post",
        relatedId: postId,
      });
    }

    return like;
  }

  async dislikePost(postId: string, userId: string): Promise<LikePostData> {
    const existingLike = await prismaClient.postLike.findFirst({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });

    if (!existingLike) {
      throw new Error("Post not liked by this user");
    }

    await prismaClient.postLike.delete({
      where: {
        id: existingLike.id,
      },
    });

    await prismaClient.post.update({
      where: {
        id: postId,
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

export { LikePostService };
