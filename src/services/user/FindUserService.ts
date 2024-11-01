import { AppError } from "../../Error/AppError.error";
import { ReturnUserData } from "../../interfaces/user/UserTypes";
import prismaClient from "../../prisma";
import { userReturnSchema } from "../../schemas/userSchemas";

class FindUserService {
  async execute(id: string): Promise<ReturnUserData> {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      },
      include: { posts: true },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return userReturnSchema.parse(user);
  }
}

export { FindUserService };
