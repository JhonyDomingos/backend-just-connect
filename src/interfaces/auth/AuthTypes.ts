import { z } from "zod";
import { forgotPasswordSchema, loginSchema, resetPasswordSchema } from "../../schemas/authSchemas";

type LoginData = z.infer<typeof loginSchema>;
type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export { LoginData, ResetPasswordData, ForgotPasswordData };
