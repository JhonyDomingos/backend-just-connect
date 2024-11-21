import { Request, Response } from "express";
import { TagFollowStatusService } from "../../services/tag/TagFollowStatusService";

class TagFollowStatusController {
    async handle(request: Request, response: Response): Promise<Response> {
      const { sub } = response.locals.decodedToken;
      const { tag } = request.params;
  
      const followStatusService = new TagFollowStatusService();
      const status = await followStatusService.execute(tag, sub);
  
      return response.status(200).json(status);
    }
}

export {TagFollowStatusController}