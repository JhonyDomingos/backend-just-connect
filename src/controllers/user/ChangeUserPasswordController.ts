import { Request, Response } from "express";
import { ChangePasswordService } from "../../services/user/ChangePasswordService";
import { userChangePasswordSchema } from "../../schemas/userSchemas";
import { ChangeUserPasswordData } from "../../interfaces/user/UserTypes";

class ChangeUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user_id;
    const data: ChangeUserPasswordData = userChangePasswordSchema.parse(request.body);
    const changePasswordService = new ChangePasswordService();
    const user = await changePasswordService.execute(data, userId);
    return response.json(user);
  }
}

export { ChangeUserPasswordController };
