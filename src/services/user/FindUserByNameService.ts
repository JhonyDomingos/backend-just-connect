import { AppError } from "../../Error/AppError.error";
import { ReturnUsersData } from "../../interfaces/user/UserTypes";
import prismaClient from "../../prisma";
import { userListSchema } from "../../schemas/userSchemas";

class FindUserByNameService {
  async execute(name: string): Promise<ReturnUsersData> {
    const users = await prismaClient.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    return userListSchema.parse(users);
  }
}

export { FindUserByNameService };
