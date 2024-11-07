import { Request, Response } from "express";
import { ReturnProfileUserData } from "../../interfaces/user/UserTypes";
import { GetUserProfileService } from "../../services/user/GetUserProfileService";

class GetUserProfileController {
  async handle(_: Request, response: Response): Promise<Response> {
    const { sub } = response.locals.decodedToken;

    const getUserProfile = new GetUserProfileService();

    const user: ReturnProfileUserData = await getUserProfile.execute(sub);

    return response.json(user);
  }
}

export { GetUserProfileController };
