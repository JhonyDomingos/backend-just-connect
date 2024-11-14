import { Request, Response } from "express";
import { AuthService } from "../../services/auth/AuthService";
import { ForgotPasswordData, LoginData } from "../../interfaces/auth/AuthTypes";
import { forgotPasswordSchema, loginSchema } from "../../schemas/authSchemas";
import { sendPasswordResetEmail } from "../../services/auth/EmailService";

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const authService = new AuthService();
    const data: ForgotPasswordData = forgotPasswordSchema.parse(request.body);
    const resetToken = await authService.generateResetToken(data.email);
    await sendPasswordResetEmail(data.email, resetToken);
    response.status(200).json({ message: "Password reset email sent. Please check your inbox." });
  }
}
export { ForgotPasswordController };
