import { ReturnUsersData } from "../../interfaces/user/UserTypes";
import prismaClient from "../../prisma";
import { userListSchema } from "../../schemas/userSchemas";
import { Prisma } from "@prisma/client";

class FindAllUserService {
  async execute(
    name?: string,
    page: number = 1,
    limit: number = 16
  ): Promise<{ users: ReturnUsersData; totalPages: number }> {
    const searchByName: Prisma.UserWhereInput | undefined = name
      ? {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }
      : undefined;

    const [users, total] = await Promise.all([
      prismaClient.user.findMany({
        where: searchByName || {},
        skip: (page - 1) * limit,
        take: limit,
        include: {
          posts: true
        },
      }),
      prismaClient.user.count({
        where: searchByName,
      })
    ]);

    const usersWithPostCount = users.map(user => ({
      ...user,
      postCount: user.posts.length,
    }));

    return {
      users: userListSchema.parse(usersWithPostCount),
      totalPages: Math.ceil(total / limit),
    };
  }
}

export { FindAllUserService };
