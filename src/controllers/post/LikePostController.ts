import { Request, Response } from "express";
import { LikePostService } from "../../services/post/LikePostService";

class LikePostController {

  async likePost(req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;
    const { sub } = res.locals.decodedToken;
    const likePostService = new LikePostService();
    const likedPost = await likePostService.likePost(postId, sub);
    return res.status(200).json(likedPost);
  }

  async dislikePost(req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;
    const { sub } = res.locals.decodedToken;
    const likePostService = new LikePostService();
    const dislikedPost = await likePostService.dislikePost(postId, sub);
    return res.status(200).json(dislikedPost);
  }

  async likeStatus(req: Request, res: Response): Promise<Response> {
    const { sub } = res.locals.decodedToken;
    const { postId } = req.params;

    const likePostService = new LikePostService();
    const status = await likePostService.checkLike(postId, sub);

    return res.status(200).json(status);
  }
}

export { LikePostController };
