import { Request, Response } from 'express';
import { FindAllPostsService } from '../../services/post/FindAllPostService';

class FindAllPostController {

  /**
 * Retrieve all posts.
 * 
 * This function handles the HTTP request to retrieve all posts from the database. 
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send back the list of posts or an error message.
 * @returns {Promise<Response>} The HTTP response containing the list of posts or an error message.
 */
  async findAll(req: Request, res: Response) {
    try {
      const postsService = new FindAllPostsService();
      const posts = await postsService.findAll();

      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { FindAllPostController };