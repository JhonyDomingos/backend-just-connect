import { Request, Response } from 'express';
import { FindAllCommentService } from '../../services/comments/FindAllCommentService';

class FindAllCommentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id; // o `userId` deve estar disponível no request, possivelmente vindo do middleware de autenticação.

    const findAllCommentService = new FindAllCommentService();

    try {
      const comments = await findAllCommentService.findAll(userId); // Passa o `userId` ao serviço
      return res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving comments' });
    }
  }
}

export { FindAllCommentController };
