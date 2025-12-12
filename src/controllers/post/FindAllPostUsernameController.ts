import { Request, Response } from "express";
import { FindAllPostUsernameService } from "../../services/post/FindAllPostUsernameService";

class FindAllPostUsernameController {
  /**
   * Retrieve all posts by username.
   *
   * This function handles the HTTP request to retrieve all posts from the database.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object used to send back the list of posts or an error message.
   * @returns {Promise<Response>} The HTTP response containing the list of posts or an error message.
   */

  async findAll(req: Request, res: Response) {
    const { username } = req.params;
    const postsService = new FindAllPostUsernameService();
    const posts = await postsService.findAll(username);
    return res.status(200).json(posts);
  }
}

export { FindAllPostUsernameController };
