import { Request, Response } from "express";
import { UpdatePostService } from "../../services/post/UpdatePostService";

class UpdatePostController {
  /**
   * Update an existing post.
   *
   * This function handles the HTTP request to update an existing post. It checks if the post
   * exists and whether the user has permission to update it. If successful, the updated post is returned.
   *
   * @param {Request} req - The request object containing the post ID in the URL parameters and updated data in the body.
   * @param {Response} res - The response object used to send back the updated post or an error message.
   * @returns {Promise<Response>} The HTTP response containing the updated post or an error message.
   */
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const { sub } = res.locals.decodedToken;

    const postsService = new UpdatePostService();
    const post = await postsService.update(id, data, sub);

    return res.status(200).json(post);
  }
}

export { UpdatePostController };
