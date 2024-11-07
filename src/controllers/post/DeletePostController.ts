import { Request, Response } from 'express';
import { DeletePostService } from '../../services/post/DeletePostService';

class DeletePostController {

  /**
 * Delete a post.
 * 
 * This function handles the HTTP request to delete a post. It checks if the post exists and whether 
 * the user has permission to delete it. If successful, a 204 No Content response is returned.
 * 
 * @param {Request} req - The request object containing the post ID in the URL parameters.
 * @param {Response} res - The response object used to send back a confirmation of deletion or an error message.
 * @returns {Promise<Response>} The HTTP response with a 204 status if deleted, or an error message.
 */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { sub } = res.locals.decodedToken;

      const postsService = new DeletePostService();
      await postsService.delete(id, sub);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletePostController };