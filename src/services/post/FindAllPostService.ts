import prismaClient from '../../prisma';
import { ReturnPostData } from "../../interfaces/post/PostType";

class FindAllPostsService {

  /**
 * Retrieves all posts.
 * 
 * @returns {Promise<ReturnPostData[]>} - A list of all posts.
 */
  async findAll(): Promise<ReturnPostData[]> {
    const posts = await prismaClient.post.findMany({
      include: {
        tags: true
      },
      where: {
        admin_post_block: false
      }
    });
    return posts;
  }
}

export { FindAllPostsService };