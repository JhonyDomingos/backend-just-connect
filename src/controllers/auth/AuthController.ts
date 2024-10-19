import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/AuthService';
import { AuthRequest } from '../../interfaces/auth/authRequest';

class AuthController {
    async handle(request: Request, response: Response) {
      const { email, username, password } = request.body as AuthRequest;
      const authService = new AuthService();
      const auth = await authService.execute({
        email, username, password
      });
      return response.json(auth);
  }
}
export { AuthController };