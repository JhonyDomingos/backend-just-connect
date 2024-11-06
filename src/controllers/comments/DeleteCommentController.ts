import { Request, Response } from 'express';
import { DeleteCommentService } from '../../services/comments/DeleteCommentService';

class DeleteCommentController {
  /**
   * Delete a comment.
   *
   * This function handles the HTTP request to delete a comment. It extracts the comment ID from
   * the request parameters and the authenticated user's ID, then calls the DeleteCommentService
   * to perform the deletion operation.
   *
   * @param {Request} req - The request object containing the comment ID in the parameters and user ID in the middleware.
   * @param {Response} res - The response object used to send back a success message or an error message.
   * @returns {Promise<Response>} The HTTP response indicating the result of the deletion operation.
   */
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { sub } = res.locals.decodedToken;

    const deleteCommentService = new DeleteCommentService();
    await deleteCommentService.delete(id, sub);
    return res.status(204).send();
  }
}

export { DeleteCommentController };
