import { Request, Response } from 'express';
import { FindUserService } from '../../services/user/FindUserService';

class FindUserController {
  async handle(request: Request, response: Response) {
    const user_id = request?.user_id;

    const findUserService = new FindUserService();

    const user = await findUserService.execute(user_id);

    return response.json(user);
  }
}

export { FindUserController };