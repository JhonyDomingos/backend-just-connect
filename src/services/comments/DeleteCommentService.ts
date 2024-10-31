import prismaClient from '../../prisma';
import { ReturnCommentData } from "../../interfaces/comments/CommentsType";

class DeleteCommentService {
  /**
   * Deletes a comment from the database.
   *
   * @param {string} commentId - The ID of the comment to be deleted.
   * @param {string} userId - The ID of the user attempting to delete the comment.
   * @returns {Promise<ReturnCommentData>} - A promise that resolves to the deleted comment data.
   *
   * @throws {Error} - Throws an error if the comment deletion fails.
   */
  async delete(commentId: string, userId: string): Promise<ReturnCommentData> {
    // Optionally, you might want to check if the comment exists and if the user has permission to delete it.

    const deletedComment = await prismaClient.comment.delete({
      where: {
        id: commentId,
        user_id: userId, 
      },
    });

    return deletedComment;
  }
}

export { DeleteCommentService };