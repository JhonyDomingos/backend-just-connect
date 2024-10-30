import prismaClient from '../../prisma';
import { ReturnPostData, UpdatePostData } from "../../interfaces/post/PostType";


class UpdatePostService {

  /**
 * Updates an existing post.
 * 
 * @param {string} id - The ID of the post to update.
 * @param {UpdatePostData} data - The data to update the post with.
 * @param {string} userId - The ID of the user updating the post.
 * @returns {Promise<ReturnPostData>} - The updated post.
 * @throws {AppError} - If the post is not found or the user lacks permission.
 */
  async update(id: string, data: UpdatePostData, userId: string): Promise<ReturnPostData> {
    const post = await prismaClient.post.findUnique({
      where: { id }
    });

    if (!post) {
      throw new Error("Postagem não encontrada.");
    }

    if (post.user_id !== userId) {
      throw new Error("Sem permissão para deletar esse post.");
    }

    const updatedPost = await prismaClient.post.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        statusOpen: data.statusOpen,
        tags: data.tags ? {
          set: data.tags.map(tagId => ({ id: tagId.id }))
        } : undefined
      },
      include: {
        tags: false
      }
    });

    return updatedPost;
  }

}

export { UpdatePostService };