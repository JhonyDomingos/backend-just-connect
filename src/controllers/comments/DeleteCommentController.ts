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
    const { id } = req.params; // Obtém o ID do comentário a ser deletado dos parâmetros da requisição
    const userId = req.user_id; // Obtém o ID do usuário autenticado

    const deleteCommentService = new DeleteCommentService(); // Instancia o serviço de deleção de comentários
    try {
      const deletedComment = await deleteCommentService.delete(id, userId); // Chama o serviço para deletar o comentário
      return res.status(200).json({ message: 'Comentário deletado com sucesso', deletedComment }); // Retorna uma mensagem de sucesso e o comentário deletado
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Retorna um erro caso a deleção falhe
    }
  }
}

export { DeleteCommentController };