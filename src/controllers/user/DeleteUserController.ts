import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";
import { AppError } from "../../Error/AppError.error";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

 
    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute(id);

    return response.status(204).send();
  }
}

export { DeleteUserController };
