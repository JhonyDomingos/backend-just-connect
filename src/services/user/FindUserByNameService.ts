import { ReturnUsersData } from "../../interfaces/user/UserTypes";
import prismaClient from "../../prisma";
import { userListSchema } from "../../schemas/userSchemas";

class FindUserByNameService {
  async execute(
    name: string,
    page: number = 1,
    limit: number = 16
  ): Promise<{ users: ReturnUsersData; totalPages: number }> {
    const [users, total] = await Promise.all([
      prismaClient.user.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prismaClient.user.count({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      }),
    ]);

    return {
      users: userListSchema.parse(users),
      totalPages: Math.ceil(total / limit),
    };
  }
}

export { FindUserByNameService };
