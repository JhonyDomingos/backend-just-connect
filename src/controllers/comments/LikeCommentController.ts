import { Request, Response, NextFunction } from 'express';
import { LikeCommentService } from '../../services/comments/LikeCommentService';

class LikeCommentController {
  private likeCommentService: LikeCommentService;

  constructor() {
    this.likeCommentService = new LikeCommentService();
  }

  async likeComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.params;
    const { userId } = req.body;
    
    try {
      const likedComment = await this.likeCommentService.likeComment(commentId, userId);
      res.status(200).json(likedComment);

    } catch (error) {
      next(error);
    }
  }

  async dislikeComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.params;
    const { userId } = req.body;

    try {
      const dislikedComment = await this.likeCommentService.dislikeComment(commentId, userId);
      res.status(200).json(dislikedComment);
      
    } catch (error) {
      next(error);
    }
  }

}

export { LikeCommentController };