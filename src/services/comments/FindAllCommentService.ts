import { prismaClient } from "../../prisma";
import { ReturnCommentData } from "../../interfaces/comments/CommentTypes"; // Certifique-se de que esse tipo exista
import { ListCommentSchema } from "../../schemas/commentSchemas";

class FindAllCommentService {
  /**
   * Retrieves all comments.
   *
   * @returns {Promise<ReturnCommentData[]>} - A list of all comments.
   */
  async findAll(): Promise<ReturnCommentData[]> {
    const comments = await prismaClient.comment.findMany();

    return ListCommentSchema.parse(comments);
  }
}

export { FindAllCommentService };
