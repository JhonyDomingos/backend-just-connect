import { Request, Response } from "express";
import { LikeCommentService } from "../../services/comments/LikeCommentService";

class LikeCommentController {
  async likeComment(req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params;
    const { sub } = res.locals.decodedToken;
    const likeCommentService = new LikeCommentService();
    const likedComment = await likeCommentService.likeComment(
      commentId,
      sub
    );
    return res.status(200).json(likedComment);
  }

  async dislikeComment(req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params;
    const { sub } = res.locals.decodedToken;
    const likeCommentService = new LikeCommentService();
    const dislikedComment = await likeCommentService.dislikeComment(
      commentId,
      sub
    );
    return res.status(200).json(dislikedComment);
  }
}

export { LikeCommentController };
