import {prismaClient} from "../../prisma";
import { ListPostData } from "../../interfaces/post/PostType";
import { listPostSchema } from "../../schemas/postSchemas";

class FindAllPostsService {
  /**
   * Retrieves all posts.
   *
   * @returns {Promise<ListPostData>} - A list of all posts.
   */
  async findAll(): Promise<ListPostData> {
    const findPosts = await prismaClient.post.findMany({
      where: {
        admin_post_block: false,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
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

export { FindAllPostsService };
