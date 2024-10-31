import { Request, Response } from 'express';
import { CommentCreateService } from '../../services/comments/CreateCommentService';

class CreateCommentController {

  /**
   * Create a new comment.
   * 
   * This function handles the HTTP request to create a new comment. It extracts the necessary data from 
   * the request body and the authenticated user's ID, then calls the CommentCreateService to perform 
   * the creation operation.
   * 
   * @param {Request} req - The request object containing the comment data in the body and user ID in the middleware.
   * @param {Response} res - The response object used to send back the created comment or an error message.
   * @returns {Promise<Response>} The HTTP response containing the created comment or an error message.
   */
  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body; // Obtém os dados do comentário do corpo da requisição
    const userId = req.user_id; // Obtém o ID do usuário autenticado
    const {id} = req.params;


    const commentService = new CommentCreateService(); // Instancia o serviço de criação de comentários
    const comment = await commentService.create(data, userId, id); // Chama o serviço para criar o comentário

    return res.status(201).json(comment); // Retorna o comentário criado com status 201
  }
}

export { CreateCommentController };
