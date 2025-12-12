import {prismaClient} from "../../prisma";
import { ReturnCommentData } from "../../interfaces/comments/CommentTypes";
import { AppError } from "../../Error/AppError.error";

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
  async delete(id: string): Promise<void> {

    await prismaClient.comment.delete({
      where: {
        id
      },
    });
  }
}

export { DeleteCommentService };
