import prismaClient from '../../prisma';
import { ReturnPostData } from "../../interfaces/post/PostType";
import { UsernameRequest } from "../../interfaces/user/UsernameRequest";

class FindAllPostUsernameService {
  async findAll({ username }: UsernameRequest): Promise<ReturnPostData[]> {

    const user = await prismaClient.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      throw new Error('User not found');
      return [];
    }
    
    const posts = await prismaClient.post.findMany({
      where: {
        user_id: user.id
      }
    });

    return posts;
  }
}

export { FindAllPostUsernameService };