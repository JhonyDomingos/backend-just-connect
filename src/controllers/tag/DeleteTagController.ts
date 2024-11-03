import { Request, Response } from 'express';
import { DeleteTagService } from '../../services/tag/DeleteTagService'

class DeleteTagController {

    /**
     * Delete a Tag.
     * 
     * This function handles the HTTP request to delete a tag. It extracts the tag ID from 
     * the request parameters and the authenticated user's ID, then calls the DeleteTagService 
     * to perform the deletion operation.
     * 
     * @param {Request} req - The request object containing the comment ID in the parameters.
     * @param {Response} res - The response object used to send back a success message or an error message.
     * @returns {Promise<Response>} The HTTP response indicating the result of the deletion operation.
     */
    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params; // Obtém o ID da tag a ser deletada dos parâmetros da requisição.

        const deleteTagService = new DeleteTagService(); //instancia o serviço de seleção de tags
        try {
            const deletedTag = await DeleteTagService.delete(id) //Chama o serviço para deletar a tag
            return res.status(200).json({ message: 'Comentário deletado com sucesso' , deletedTag }); //Retorna uma mensagem de sucesso e a tag deletada
        } catch (error) {
            return res.status(400).json({ error: error.message }); // Retorna um erro caso a deleção falhe

        }
    }
}

export { DeleteTagController }