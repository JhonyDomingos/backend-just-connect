import prismaClient from "../../prisma";
import { UpdateCommentData } from "../../interfaces/comments/CommentTypes";
import { updateCommentSchema } from "../../schemas/commentSchemas";

class UpdateCommentService {
  /**
   * Updates an existing comment in the database.
   *
   * @param {string} id - The ID of the comment to be updated.
   * @returns {Promise<UpdateCommentData>} - A promise that resolves to the updated comment data.
   *
   * @throws {Error} - Throws an error if the comment update fails or if the comment is not found.
   */
  async update(
    id: string,
    userId: string,
    comment: string
  ): Promise<UpdateCommentData> {
    const findComment = await prismaClient.comment.findUnique({
      where: { id },
    });

    if (!findComment) {
      throw new Error("Comentário não encontrada.");
    }

    if (findComment.user_id !== userId) {
      throw new Error("Sem permissão para editar esse comentário.");
    }

    const updatedComment = await prismaClient.comment.update({
      where: {
        id,
        user_id: userId,
      },
      data: {
        comment,
      },
    });

    return updateCommentSchema.parse(updatedComment);
  }
}

export { UpdateCommentService };
