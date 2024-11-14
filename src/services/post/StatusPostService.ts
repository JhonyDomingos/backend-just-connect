import prismaClient from "../../prisma";
import { ReturnPostData, UpdatePostData } from "../../interfaces/post/PostType";
import { returnPostSchema } from "../../schemas/postSchemas";

class StatusPostService {
  async update(id: string, userId: string): Promise<ReturnPostData> {
    const post = await prismaClient.post.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!post) {
      throw new Error("Postagem não encontrada.");
    }

    if (post.user_id !== userId) {
      throw new Error("Sem permissão para editar esse post.");
    }

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
