// src/controllers/score/LikeCommentController.ts
import { Request, Response } from 'express';
import { CommentScoreService } from '../../services/comments/CommentScoreService';

class LikeCommentController {
  async like(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    const { commentId } = req.params;

    const commentScoreService = new CommentScoreService();

    try {
      const result = await commentScoreService.likeComment(userId, commentId);
      return res.status(200).json({
        message: 'Comentário curtido com sucesso!',
        success: result
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Erro ao curtir o comentário.'
      });
    }
  }
}

export { LikeCommentController };