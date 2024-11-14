import { Request, Response } from 'express';
import { CommentScoreService } from '../../services/score/CommentScoreService';

class RemoveLikeCommentController {
  async removeLike(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    const { commentId } = req.params;

    const commentScoreService = new CommentScoreService();

    try {
      const result = await commentScoreService.removeLike(userId, commentId);
      return res.status(200).json({
        message: 'Like removido com sucesso!',
        success: result
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Erro ao remover o like do comentário.'
      });
    }
  }
}

export { RemoveLikeCommentController };