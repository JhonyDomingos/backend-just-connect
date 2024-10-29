import { Request, Response } from 'express';
import { PostCreateService } from '../../services/post/CreatePostService';


class CreatePostController {

  /**
 * Create a new post.
 * 
 * This function handles the HTTP request to create a new post. It extracts the necessary data from 
 * the request body and the authenticated user's ID, then calls the PostCreateService to perform 
 * the creation operation.
 * 
 * @param {Request} req - The request object containing the post data in the body and user ID in the middleware.
 * @param {Response} res - The response object used to send back the created post or an error message.
 * @returns {Promise<Response>} The HTTP response containing the created post or an error message.
 */
  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const userId = req.user_id;
    
    const postsService = new PostCreateService();
    const post = await postsService.create(data, userId);

    return res.status(201).json(post);
  }
};

export { CreatePostController };