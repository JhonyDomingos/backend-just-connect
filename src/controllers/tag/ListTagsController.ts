import { Request, Response } from "express";
import { ListTagsService } from "../../services/tag/ListTagsService";
import { ListTagData } from "../../interfaces/tag/TagTypes";

class ListTagsController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listTagsService = new ListTagsService();
    const tags: ListTagData = await listTagsService.findAll();
    return response.status(200).json(tags);
  }
}

export { ListTagsController };