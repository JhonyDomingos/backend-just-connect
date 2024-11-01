import { Request, Response } from "express";
import { ReturnProfileUserData } from "../../interfaces/user/UserTypes";
import { GetUserProfileService } from "../../services/user/GetUserProfileService";

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user_id;

    const getUserProfile = new GetUserProfileService();

    const user: ReturnProfileUserData = await getUserProfile.execute(userId);

    return response.json(user);
  }
}

export { GetUserProfileController };
