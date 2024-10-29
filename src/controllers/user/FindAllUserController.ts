import { Request, Response } from "express";
import { FindAllUserService } from "../../services/user/FindAllUserService";
import { ReturnUsersData } from "../../interfaces/user/UserTypes";
import { FindUserByNameService } from "../../services/user/FindUserByNameService";

class FindAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    if (!request.query.name) {
      const findAllUserService = new FindAllUserService();
      const users: ReturnUsersData = await findAllUserService.execute();
      return response.json(users);
    } else {
      const name: string = request.query.name as string;
      const findUsersByNameService = new FindUserByNameService();
      const users: ReturnUsersData = await findUsersByNameService.execute(name);
      return response.json(users);
    }
  }
}

export { FindAllUserController };
