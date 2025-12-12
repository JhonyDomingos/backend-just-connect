import { AppError } from "../../Error/AppError.error";
import { ReturnUserData } from "../../interfaces/user/UserTypes";
import {prismaClient} from "../../prisma";
import { userReturnSchema } from "../../schemas/userSchemas";

class FindUserService {
  async execute(id: string): Promise<ReturnUserData> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          where: { admin_post_block: false },
          select: {
            id: true,
            title: true,
            description: true,
            score: true,
            status_open: true,
            created_at: true,
            updated_at: true,
            tags: true,
            comment: {
              select: { id: true },
            },
          },
        },
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const postsWithCommentCount = user.posts.map((post) => ({
      ...post,
      username: user.username,
      commentCount: post.comment.length,
    }));

    return userReturnSchema.parse({ ...user, posts: postsWithCommentCount });
  }
}

export { FindUserService };
