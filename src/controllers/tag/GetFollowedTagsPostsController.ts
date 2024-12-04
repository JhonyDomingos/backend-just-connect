import { Request, Response } from "express";
import { GetFollowedTagsPostsService } from "../../services/tag/GetFollowedTagsPostsService";

class GetFollowedTagsPostsController {
  async handle(_: Request, res: Response): Promise<Response> {
    const { sub } = res.locals.decodedToken;
    const getFollowedTagsPosts = new GetFollowedTagsPostsService();
    const posts = await getFollowedTagsPosts.getPosts(sub);
    return res.status(200).json(posts);
  }
}

export { GetFollowedTagsPostsController };
