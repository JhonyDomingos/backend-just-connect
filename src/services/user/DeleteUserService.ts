import { AppError } from "../../Error/AppError.error";
import prismaClient from "../../prisma";

class DeleteUserService {
  async execute(id: string): Promise<void> {
    const user = await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}

export { DeleteUserService };
