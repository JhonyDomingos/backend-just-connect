import { Request, Response } from 'express';
import { FindAllCommentService } from '../../services/comments/FindAllCommentService';

class FindAllCommentController {
  async handle(_: Request, res: Response): Promise<Response> {
    const { sub } = res.locals.decodedToken;

    const findAllCommentService = new FindAllCommentService();
    const comments = await findAllCommentService.findAll(sub);
    return res.status(200).json(comments);
  }
}

export { FindAllCommentController };
