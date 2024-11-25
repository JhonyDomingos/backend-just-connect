import { Request, Response, NextFunction } from "express";
import { LikePostService } from "../../services/post/LikePostService";

class LikePostController {
  private likePostService: LikePostService;

  constructor() {
    this.likePostService = new LikePostService();
  }

  async likePost(req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;
    const { sub } = res.locals.decodedToken;
    const likedPost = await this.likePostService.likePost(postId, sub);
    return res.status(200).json(likedPost);
  }

  async dislikePost(req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;
    const { sub } = res.locals.decodedToken;
    const dislikedPost = await this.likePostService.dislikePost(postId, sub);
    return res.status(200).json(dislikedPost);
  }
}

export { LikePostController };
