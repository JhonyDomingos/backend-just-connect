import prismaClient from '../../prisma';
import { ReturnPostData } from "../../interfaces/post/PostType";

class FindAllPostsUserService {
  async findAll(userId: string): Promise<ReturnPostData[]> {
    const posts = await prismaClient.post.findMany({
      where: {
        user_id: userId
      }
    });
    return posts;
  }
}

export { FindAllPostsUserService };
