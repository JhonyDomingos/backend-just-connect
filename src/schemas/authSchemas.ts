import { z } from "zod";
import { userSchema } from "./userSchemas";

const loginSchema = userSchema
  .pick({
    password: true
  })
  .extend({
    email: z.string().optional(),
    username: z.string().optional(),
  })
  .refine((data) => data.email || data.username, {
    message: "You have to inform your e-mail or your username",
    path: ["email", "username"],
  });

const forgotPasswordSchema = userSchema.pick({ email: true });

const resetPasswordSchema = z.object({
    token: z.string(),
    newPassword: z
      .string()
      .min(8, { message: "Password must have at least 8 characters." })
      .regex(/(?=.*[a-zA-Z])(?=.*\d)/, {
        message: "Password must contain at least one number and one letter.",
      }),
    confirmNewPassword: z.string().min(8),
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    { message: "Passwords doesn't match." }
  );

export { loginSchema, forgotPasswordSchema, resetPasswordSchema };
