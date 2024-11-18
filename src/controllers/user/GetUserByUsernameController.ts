import { Request, Response } from 'express';
import { ReturnUserData } from '../../interfaces/user/UserTypes';
import { GetUserByUsernameService } from '../../services/user/GetUserByUsernameService';

class GetUserByUsernameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const findUserService = new GetUserByUsernameService();
    const user: ReturnUserData = await findUserService.execute(username);
    return response.status(200).json(user);
  }
}

export { GetUserByUsernameController };