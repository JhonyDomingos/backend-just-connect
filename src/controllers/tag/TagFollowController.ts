import { Request, Response } from "express";
import { FollowTagService } from "../../services/tag/FollowTagService";
import { UnfollowTagService } from "../../services/tag/UnfollowTagService";
import { TagFollowService } from "../../services/tag/TagFollowService";

class TagFollowController {
  async unfollow(request: Request, response: Response): Promise<Response> {
    const { sub } = response.locals.decodedToken;
    const { tag } = request.params;

    const unfollowService = new UnfollowTagService();
    await unfollowService.execute(tag, sub);

    return response.status(200).json({ message: "Tag unfollowed" });
  }

  async follow(request: Request, response: Response): Promise<Response> {
    const { sub } = response.locals.decodedToken;
    const { tag } = request.params;

    const followService = new FollowTagService();
    const followed = await followService.execute(tag, sub);

    return response.status(200).json(followed);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { sub } = response.locals.decodedToken;
    const { tag } = request.params;

    const followService = new TagFollowService();
    const followed = await followService.execute(tag, sub);

    return response.status(200).json(followed);
  }
}

export { TagFollowController };
