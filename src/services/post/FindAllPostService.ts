import prismaClient from '../../prisma';
import { ListPostData } from "../../interfaces/post/PostType";
import { listPostSchema } from '../../schemas/postSchemas';

class FindAllPostsService {

  /**
 * Retrieves all posts.
 * 
 * @returns {Promise<ListPostData>} - A list of all posts.
 */
  async findAll(): Promise<ListPostData> {
    const posts = await prismaClient.post.findMany({
      include: {
        tags: true
      },
      where: {
        admin_post_block: false
      }
    });
    return listPostSchema.parse(posts);
  }
}

export { FindAllPostsService };