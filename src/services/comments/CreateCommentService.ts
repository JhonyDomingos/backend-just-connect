// src/services/CommentCreateService.ts

import prismaClient from '../../prisma';
import { CreateCommentData, ReturnCommentData } from "../../interfaces/comments/CommentsType";

class CommentCreateService {
  /**
   * Creates a new comment in the database.
   *
   * @param {CreateCommentData} data - The data for the comment being created.
   * @param {string} userId - The ID of the user creating the comment.
   * @returns {Promise<ReturnCommentData>} - A promise that resolves to the created comment data.
   *
   * @throws {Error} - Throws an error if the comment creation fails.
   */
  async create(data: CreateCommentData, userId: string, postId: string ): Promise<ReturnCommentData> {
    

    const comment = await prismaClient.comment.create({
      data: {
        user_id: userId,
        post_id: postId,
        comment: data.comment,
      }
    });
    return comment;
  }
}

export { CommentCreateService };