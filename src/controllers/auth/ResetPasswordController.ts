import { Request, Response } from "express";
import { AuthService } from "../../services/auth/AuthService";
import { resetPasswordSchema } from "../../schemas/authSchemas";

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const authService = new AuthService();
    const resetPasswordData = resetPasswordSchema.parse(request.body);
    await authService.resetPassword(resetPasswordData);
    response.json({ message: "Password has been reset." });
  }
}

export { ResetPasswordController };
