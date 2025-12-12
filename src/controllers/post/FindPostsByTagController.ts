import { Request, Response } from "express";
import { FindPostsByTagService } from "../../services/post/FindPostsByTagService";

class FindPostsByTagController {
  async tagged(req: Request, res: Response): Promise<Response> {
    const { tag } = req.params;
    const listPostsWithTagService = new FindPostsByTagService();
    const posts = await listPostsWithTagService.tagged(tag);
    return res.json(posts);
  }
}

export { FindPostsByTagController };
