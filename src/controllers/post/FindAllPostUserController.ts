import { Request, Response } from 'express';
import { FindAllPostsUserService } from '../../services/post/FindAllPostUserService';


class FindAllPostUserController {
  
    /**
    * Retrieve all posts by user id.
    * 
    * This function handles the HTTP request to retrieve all posts from the database. 
    async findAll(req: CustomRequest, res: Response) {
    * @param {Request} req - The request object.
    * @param {Response} res - The response object used to send back the list of posts or an error message.
    * @returns {Promise<Response>} The HTTP response containing the list of posts or an error message.
    */

    async findAll(req: Request, res: Response) {
        const { userId } = req.params;
        const postsService = new FindAllPostsUserService();
        const posts = await postsService.findAll(userId);
        
        return res.json(posts);
    }
}

export { FindAllPostUserController };