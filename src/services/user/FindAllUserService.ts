import { ReturnUsersData } from "../../interfaces/user/UserTypes";
import prismaClient from "../../prisma";
import { userListSchema } from "../../schemas/userSchemas";

class FindAllUserService {
  async execute(): Promise<ReturnUsersData> {
    const users = await prismaClient.user.findMany();

    return userListSchema.parse(users);
  }
}

export { FindAllUserService };