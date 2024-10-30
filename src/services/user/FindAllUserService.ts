import { ReturnUsersData } from "../../interfaces/user/UserTypes";
import prismaClient from "../../prisma";
import { userListSchema } from "../../schemas/userSchemas";

class FindAllUserService {
  async execute(
    page: number = 1,
    limit: number = 16
  ): Promise<{ users: ReturnUsersData; totalPages: number }> {
    const [users, total] = await Promise.all([
      prismaClient.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      prismaClient.user.count(),
    ]);

    return {
      users: userListSchema.parse(users),
      totalPages: Math.ceil(total / limit),
    };
  }
}

export { FindAllUserService };
