import { Request, Response } from "express";
import { FindAllUserService } from "../../services/user/FindAllUserService";
import { ReturnUsersData } from "../../interfaces/user/UserTypes";
import { FindUserByNameService } from "../../services/user/FindUserByNameService";

class FindAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, page, limit = 16 } = request.query;

    if (!name) {
      const findAllUserService = new FindAllUserService();
      const { users, totalPages } = await findAllUserService.execute(Number(page), Number(limit));
      return response.json({ users, totalPages, page, limit });
    } else {
      const userName: string = name as string;
      const findUsersByNameService = new FindUserByNameService();
      const { users, totalPages } = await findUsersByNameService.execute(userName, Number(page), Number(limit));
      return response.json({ users, totalPages, page, limit });
    }
  }
}

export { FindAllUserController };
