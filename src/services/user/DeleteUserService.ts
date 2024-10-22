import prismaClient from "../../prisma";

class DeleteUserService {
  async execute(id: string) {
    if (!id) {
      throw new Error("User ID is required.");
    }

    try {
      const user = await prismaClient.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export { DeleteUserService };
