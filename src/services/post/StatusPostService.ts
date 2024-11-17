import prismaClient from "../../prisma";
import { ReturnPostData } from "../../interfaces/post/PostType";
import { returnPostSchema } from "../../schemas/postSchemas";

class StatusPostService {
  async update(id: string, ): Promise<ReturnPostData> {
    const post = await prismaClient.post.findUnique({
      where: { id },
      include: { tags: true },
    });

    const newPostStatus = post.status_open ? false : true;

    const updatedPost = await prismaClient.post.update({
      where: { id },
      data: {
        status_open: newPostStatus,
      },
      include: {
        tags: true,
      },
    });

    return returnPostSchema.parse(updatedPost);
  }
}

export { StatusPostService };
