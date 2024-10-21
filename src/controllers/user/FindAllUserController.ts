import { Request, Response } from 'express';
import { FindAllUserService } from '../../services/user/FindAllUserService';

class FindAllUserController {
  async handle(request: Request, response: Response) {
    const findAllUserService = new FindAllUserService();

    const users = await findAllUserService.execute();

    return response.json(users);
  }
}

export { FindAllUserController };