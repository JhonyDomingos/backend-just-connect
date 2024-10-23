import { Request, Response } from 'express';
import { FindAllUserService } from '../../services/user/FindAllUserService';
import { ReturnUsersData } from '../../interfaces/user/UserTypes';

class FindAllUserController {
  async handle(_: Request, response: Response): Promise<Response> {
    const findAllUserService = new FindAllUserService();

    const users: ReturnUsersData = await findAllUserService.execute();

    return response.json(users);
  }
}

export { FindAllUserController };