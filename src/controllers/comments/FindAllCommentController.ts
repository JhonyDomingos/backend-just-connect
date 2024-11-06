import { Request, Response } from 'express';
import { FindAllCommentService } from '../../services/comments/FindAllCommentService';

class FindAllCommentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;

    const findAllCommentService = new FindAllCommentService();
    const comments = await findAllCommentService.findAll(userId);
    return res.status(200).json(comments);
  }
}

export { FindAllCommentController };
