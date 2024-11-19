import { Request, Response, NextFunction } from 'express';
import { LikePostService } from '../../services/post/LikePostService';

class LikePostController {
  private likePostService: LikePostService;

  constructor() {
    this.likePostService = new LikePostService();
  }

  async likePost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { userId } = req.body;
    
    try {
      const likedPost = await this.likePostService.likePost(postId, userId);
      res.status(200).json(likedPost);

    } catch (error) {
      next(error);
    }
  }

  async dislikePost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
      const dislikedPost = await this.likePostService.dislikePost(postId, userId);
      res.status(200).json(dislikedPost);
      
    } catch (error) {
      next(error);
    }
  }

}

export { LikePostController };