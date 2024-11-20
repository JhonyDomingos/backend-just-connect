import { Request, Response } from 'express';
import { CommentScoreService } from '../../services/score/CommentScoreService';

class CommentScoreController {
  private commentScoreService: CommentScoreService;

  constructor() {
    this.commentScoreService = new CommentScoreService();
  }

  // Método para curtir o comentário
  async likeComment(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;  // Supondo que o userId seja passado no corpo da requisição
    const { commentId } = req.params;  // O commentId é passado como parâmetro na URL

    try {
      const result = await this.commentScoreService.likeComment(userId, commentId);
      return res.status(200).json({ success: true, message: 'Comentário curtido com sucesso!', result });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // Método para descurtir o comentário
  async removeLike(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;  // Supondo que o userId seja passado no corpo da requisição
    const { commentId } = req.params;  // O commentId é passado como parâmetro na URL

    try {
      const result = await this.commentScoreService.removeLike(userId, commentId);
      return res.status(200).json({ success: true, message: 'Curtir removido com sucesso!', result });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

export { CommentScoreController };
