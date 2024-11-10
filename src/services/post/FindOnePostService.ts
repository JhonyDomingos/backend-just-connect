import prismaClient from "../../prisma";
import { ReturnPostData } from "../../interfaces/post/PostType";
import { returnPostSchema } from "../../schemas/postSchemas";

class FindOnePostService {
  /**
   * Retrieves a post by its ID.
   *
   * @param {string} id - The ID of the post to retrieve.
   * @returns {Promise<ReturnPostData>} - The requested post.
   * @throws {Error} - If the post is not found.
   */
  async findOne(id: string): Promise<ReturnPostData> {
    const post = await prismaClient.post.findUnique({
      where: { id },
      include: {
        tags: true,
        comment: true,
        user: true,
      },
    });

    if (!post) {
      throw new Error("Post não encontrado.");
    }

    const formatPost = {
      ...post,
      user_id: post.user.id,
      username: post.user.username,
    };

    return returnPostSchema.parse(formatPost);
  }
}

export { FindOnePostService };
