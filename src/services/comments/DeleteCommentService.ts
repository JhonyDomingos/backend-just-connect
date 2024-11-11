import prismaClient from "../../prisma";
import { ReturnCommentData } from "../../interfaces/comments/CommentTypes";

class DeleteCommentService {
  /**
   * Deletes a comment from the database.
   *
   * @param {string} id - The ID of the comment to be deleted.
   * @param {string} userId - The ID of the user attempting to delete the comment.
   * @returns {Promise<ReturnCommentData>} - A promise that resolves to the deleted comment data.
   *
   * @throws {Error} - Throws an error if the comment deletion fails.
   */
  async delete(id: string, userId: string): Promise<void> {
    const comment = await prismaClient.post.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new Error("Comentário não encontrado.");
    }

    if (comment.user_id !== userId) {
      throw new Error("Sem permissão para deletar esse comentário.");
    }

    await prismaClient.comment.delete({
      where: {
        id,
        user_id: userId,
      },
    });
  }
}

export { DeleteCommentService };
