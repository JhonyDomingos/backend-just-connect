import prismaClient from "../../prisma";
import { ListPostData } from "../../interfaces/post/PostType";
import { listPostSchema } from "../../schemas/postSchemas";
import { AppError } from "../../Error/AppError.error";

class FindAllPostsUserService {
  async findAll(userId: string): Promise<ListPostData> {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });



    const posts = await prismaClient.post.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        title: true,
        user: {
          select: { username: true },
        },
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
    });

    const postsWithCommentCount = posts.map((post) => ({
      ...post,
      username: post.user.username,
      commentCount: post.comment.length,
    }));

    return listPostSchema.parse(postsWithCommentCount);
  }
}

export { FindAllPostsUserService };
