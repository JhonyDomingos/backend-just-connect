import { AppError } from "../../Error/AppError.error";
import prismaClient from "../../prisma";

class DeleteUserService {
  async execute(id: string) {

    try {
      const user = await prismaClient.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw new AppError("User not found", 404);
    }
  }
}

export { DeleteUserService };
