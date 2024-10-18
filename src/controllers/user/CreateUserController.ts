import { Request, Response, NextFunction } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';
import { UserRequest } from '../../interfaces/user/UserRequest';

class CreateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { name, username, email, password }: UserRequest = request.body;
    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        name,
        username,
        email,
        password
      });
      return response.json(user);
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
  }
}

export { CreateUserController };
