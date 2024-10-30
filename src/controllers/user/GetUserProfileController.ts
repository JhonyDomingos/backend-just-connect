import { Request, Response } from "express";
import { FindUserService } from "../../services/user/FindUserService";
import { ReturnUserData } from "../../interfaces/user/UserTypes";

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user_id;

    const findUserService = new FindUserService();

    const user: ReturnUserData = await findUserService.execute(userId);

    return response.json(user);
  }
}

export { GetUserProfileController };
