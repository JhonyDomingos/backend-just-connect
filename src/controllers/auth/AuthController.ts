import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/AuthService';
import { AuthRequest } from '../../interfaces/auth/authRequest';

class AuthController {
    async handle(request: Request, response: Response) {
      const authService = new AuthService();
      const { email, username, password, role } = request.body as AuthRequest;
      const auth = await authService.execute({
        email, username, password, role
      });
      return response.json(auth);
  }
}
export { AuthController };