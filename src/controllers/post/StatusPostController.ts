import { Request, Response } from 'express';
import { StatusPostService } from '../../services/post/StatusPostService';

class StatusPostController {
  async change(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;
      const { sub } = res.locals.decodedToken;
      const postsService = new StatusPostService();
      const post = await postsService.update(id, sub);
      return res.status(200).json(post);
  }
}

export { StatusPostController };