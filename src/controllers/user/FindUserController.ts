import { Request, Response } from 'express';
import { FindUserService } from '../../services/user/FindUserService';

class FindUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findUserService = new FindUserService();

    const user = await findUserService.execute(id);

    return response.json(user);
  }
}

export { FindUserController };