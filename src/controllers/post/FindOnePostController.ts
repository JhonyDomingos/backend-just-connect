import { Request, Response } from 'express';
import { FindOnePostService } from '../../services/post/FindOnePostService';

class FindOnePostController {

  /**
 * Retrieve a single post by ID.
 * 
 * This function handles the HTTP request to retrieve a specific post based on its ID.
 *  If the post is not found, a 404 error is returned.
 * 
 * @param {Request} req - The request object containing the post ID in the URL parameters.
 * @param {Response} res - The response object used to send back the requested post or an error message.
 * @returns {Promise<Response>} The HTTP response containing the post or an error message.
 */
  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const postsService = new FindOnePostService();
      const post = await postsService.findOne(id);

      return res.json(post);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { FindOnePostController };