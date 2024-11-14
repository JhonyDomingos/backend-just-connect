import { Request, Response } from "express";
import { EditUserService } from "../../services/user/EditUserService";
import { UpdateUserData } from "../../interfaces/user/UserTypes";
import { userUpdateSchema } from "../../schemas/userSchemas";

class EditUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data: UpdateUserData = userUpdateSchema.parse(request.body);

    const editUserService = new EditUserService();
    const user = await editUserService.execute(id, data);

    return response.status(200).json(user);
  }
}

export { EditUserController };
