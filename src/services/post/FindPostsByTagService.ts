import { ListPostData } from "../../interfaces/post/PostType";
import prismaClient from "../../prisma";
import { listPostSchema } from "../../schemas/postSchemas";

class FindPostsByTagService {
  async tagged(tag: string): Promise<ListPostData> {
    const findPosts = await prismaClient.post.findMany({
      where: {
        tags: {
          some: { tag },
        },
      },
      include: {
        user: { select: { id: true, username: true } },
        tags: true,
        comment: { select: { id: true } },
      },
    });

    const posts = findPosts.map((post) => ({
      ...post,
      user_id: post.user.id,
      username: post.user.username,
      commentCount: post.comment.length,
    }));

    return listPostSchema.parse(posts);
  }
}

export { FindPostsByTagService };
