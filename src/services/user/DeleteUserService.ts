import prismaClient from "../../prisma";

class DeleteUserService {
  async execute(id: string): Promise<void> {
    await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}

export { DeleteUserService };
