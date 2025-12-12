import { Request, Response } from "express";
import { FindAllUserService } from "../../services/user/FindAllUserService";

class FindAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, page = 1, limit = 16 } = request.query;

    const findUsersService = new FindAllUserService();
    
    const { users, totalPages } = await findUsersService.execute(
      name ? (name as string) : undefined,
      Number(page),
      Number(limit)
    );


    return response.json({ users, totalPages, page, limit });
  }
}

export { FindAllUserController };