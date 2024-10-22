import prismaClient from "../../prisma";

class FindAllUserService {
  async execute() {
    const users = await prismaClient.user.findMany();

    return users;
  }
}

export { FindAllUserService };