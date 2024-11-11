import prismaClient from '../../prisma';
import { ReturnCommentData } from "../../interfaces/comments/CommentTypes"; // Certifique-se de que esse tipo exista

class FindAllCommentService {

  /**
   * Retrieves all comments.
   * 
   * @returns {Promise<ReturnCommentData[]>} - A list of all comments.
   */
  async findAll(userId: string): Promise<ReturnCommentData[]> {
    const comments = await prismaClient.comment.findMany({
      where:{
        user_id: userId,
      }

    });
    return comments;
  }
}

export { FindAllCommentService };