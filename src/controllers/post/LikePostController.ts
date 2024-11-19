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

  async unlikePost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
      const unlikedPost = await this.likePostService.unlikePost(postId, userId);
      res.status(200).json(unlikedPost);
      
    } catch (error) {
      next(error);
    }
  }

}

export { LikePostController };