import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/AuthService';
import { LoginData } from '../../interfaces/auth/AuthTypes';
import { loginSchema } from '../../schemas/authSchemas';

class AuthController {
    async handle(request: Request, response: Response): Promise<Response> {
      const authService = new AuthService();
      const loginData: LoginData = loginSchema.parse(request.body);
      const auth = await authService.execute(loginData);
      return response.status(200).json(auth);
  }
}
export { AuthController };