import { Request, Response } from 'express';
import { UpdateCommentService } from '../../services/comments/UpdateCommentService';

class UpdateCommentController {
  /**
   * Update a comment.
   *
   * This function handles the HTTP request to update a comment. It extracts the comment ID from
   * the request parameters, the authenticated user's ID, and the updated comment data from the
   * request body. Then, it calls the UpdateCommentService to perform the update operation.
   *
   * @param {Request} req - The request object containing the comment ID in the parameters, user ID from middleware, and updated comment data in the body.
   * @param {Response} res - The response object used to send back the updated comment or an error message.
   * @returns {Promise<Response>} The HTTP response indicating the result of the update operation.
   */
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { sub } = res.locals.decodedToken;
    const { comment } = req.body;

    const updateCommentService = new UpdateCommentService();
    const updatedComment = await updateCommentService.update(
      id,
      sub,
      comment
    );

    return res.status(200).json(updatedComment);
  }
}

export { UpdateCommentController };
