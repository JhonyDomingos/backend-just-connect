import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/user/DeleteUserService';

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();

    try {
      await deleteUserService.execute(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { DeleteUserController };