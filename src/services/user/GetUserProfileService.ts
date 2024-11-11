import { ReturnProfileUserData } from "../../interfaces/user/UserTypes";
import prismaClient from "../../prisma";
import { userProfileReturnSchema } from "../../schemas/userSchemas";

class GetUserProfileService {
  async execute(id: string): Promise<ReturnProfileUserData> {
    const user = await prismaClient.user.findUnique({
      where: { id },
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

    const postsWithCommentCount = user.posts.map((post) => ({
      ...post,
      username: user.username,
      commentCount: post.comment.length,
    }));

    return userProfileReturnSchema.parse({
      ...user,
      posts: postsWithCommentCount,
    });
  }
}

export { GetUserProfileService };
