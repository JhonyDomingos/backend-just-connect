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
    const { id } = req.params;           // Extracts the comment ID from request parameters
    const userId = req.user_id;           // Extracts the authenticated user's ID
    const {comment} = req.body;

    const updateCommentService = new UpdateCommentService(); // Instantiates the update service
    try {
      const updatedComment = await updateCommentService.update(id, userId, comment); // Calls the update service

      if (!updatedComment) {
        return res.status(404).json({ message: 'Comentário não encontrado' }); // Returns 404 if the comment does not exist
      }

      return res.status(200).json({ message: 'Comentário atualizado com sucesso', updatedComment }); // Returns a success message and the updated comment
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Returns an error message if the update fails
    }
  }
}

export { UpdateCommentController };
