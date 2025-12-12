import { Request, Response } from "express";
import { ChangePasswordService } from "../../services/user/ChangePasswordService";
import { userChangePasswordSchema } from "../../schemas/userSchemas";
import { ChangeUserPasswordData } from "../../interfaces/user/UserTypes";

class ChangeUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sub } = response.locals.decodedToken;
    const data: ChangeUserPasswordData = userChangePasswordSchema.parse(request.body);

    const changePasswordService = new ChangePasswordService();
    const user = await changePasswordService.execute(data, sub);

    return response.status(200).json(user);
  }
}

export { ChangeUserPasswordController };
