import { Request, Response } from 'express';
import { TagCreateService } from '../../services/tag/CreateTagService';

class CreateTagController {

  /**
 * Create a new post.
 * 
 * This function handles the HTTP request to create a new tag. It extracts the necessary data from 
 * the request body, then calls the TagCreateService to perform 
 * the creation operation.
 * 
 * @param {Request} req - The request object containing the tag data in the body.
 * @param {Response} res - The response object used to send back the created tag or an error message.
 * @returns {Promise<Response>} The HTTP response containing the created tag or an error message.
 */
async create(req: Request, res: Response): Promise<Response> {
    const data = req.body; // Obtém os dados do comentário do corpo da requisição

    const tagService = new TagCreateService(); // Instancia o serviço de criação de tags
    const tag = await tagService.findOrCreate(data); // Chama o serviço para criar a tag

    return res.status(201).json(tag); // Retorna a tag criada com status 201
  }
}

export { CreateTagController };