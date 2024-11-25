import { Request, Response } from "express";
import { LikeCommentService } from "../../services/comments/LikeCommentService";

class LikeCommentController {
  private likeCommentService: LikeCommentService;

  constructor() {
    this.likeCommentService = new LikeCommentService();
  }

  async likeComment(req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params;
    const { sub } = res.locals.decodedToken;
    const likedComment = await this.likeCommentService.likeComment(
      commentId,
      sub
    );
    return res.status(200).json(likedComment);
  }

  async dislikeComment(req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params;
    const { sub } = res.locals.decodedToken;
    const dislikedComment = await this.likeCommentService.dislikeComment(
      commentId,
      sub
    );
    return res.status(200).json(dislikedComment);
  }
}

export { LikeCommentController };
