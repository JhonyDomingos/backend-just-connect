import prismaClient from "../../prisma";
import { LikePostData } from "../../interfaces/post/PostType";
import { likePostSchema } from "../../schemas/postSchemas";

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
      }
    });

    await prismaClient.post.update({
      where: {
        id: postId,
      },
      data: {
        score: {
          increment: 1,
        },
      },
    });

    return like;
  }

  async unlikePost(postId: string, userId: string): Promise<LikePostData> {
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