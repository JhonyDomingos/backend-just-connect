import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';
import { UserRequest } from '../../interfaces/user/UserRequest';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, username, email, password }: UserRequest = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ 
      name, 
      username, 
      email, 
      password 
    });

    return response.json(user);
  }
}

export { CreateUserController };