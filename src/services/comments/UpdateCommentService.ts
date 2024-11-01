
import prismaClient from '../../prisma';
import { UpdateCommentData } from "../../interfaces/comments/CommentsType";

class UpdateCommentService {
  /**
   * Updates an existing comment in the database.
   *
   * @param {string} commentId - The ID of the comment to be updated.
   * @returns {Promise<UpdateCommentData>} - A promise that resolves to the updated comment data.
   *
   * @throws {Error} - Throws an error if the comment update fails or if the comment is not found.
   */
  async update(commentId: string, userId: string, comment: string): Promise<UpdateCommentData> {
    const updatedComment = await prismaClient.comment.update({
        where: {
            id: commentId,
            user_id: userId,
        },
        data: {
          comment,
        }
    });

    return updatedComment;
  }
}

export { UpdateCommentService };