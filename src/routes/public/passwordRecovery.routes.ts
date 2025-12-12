import { Router } from "express";
import { ForgotPasswordController } from "../../controllers/auth/ForgotPasswordController";
import { ResetPasswordController } from "../../controllers/auth/ResetPasswordController";

const passwordRecoveryRoutes: Router = Router();

passwordRecoveryRoutes.post(
  "/forgot-password",
  new ForgotPasswordController().handle
);
passwordRecoveryRoutes.post(
  "/reset-password",
  new ResetPasswordController().handle
);

export { passwordRecoveryRoutes };
