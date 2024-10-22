import prismaClient from "../../prisma";

class FindUserService {
  async execute(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}

export { FindUserService };