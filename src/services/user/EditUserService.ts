import prismaClient from "../../prisma";
import { UpdateUserData } from "../../interfaces/user/UserTypes";
import { AppError } from "../../Error/AppError.error";

class EditUserService {
  async execute(id: string, data: UpdateUserData) {
    if (!id) {
      throw new Error("Id is missing");
    }

    const user = await prismaClient.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new Error("User does not exists");
    }

    const usernameAlreadyExists = await prismaClient.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (usernameAlreadyExists && usernameAlreadyExists.username !== user.username) {
      throw new AppError("Username is not available.");
    }

    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailAlreadyExists && emailAlreadyExists.email !== user.email) {
      throw new AppError("E-mail is already registered.");
    }

    const userUpdated = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        bio_description: data.bio_description,
        linkedin: data.linkedin,
        instagram: data.instagram,
        github: data.github,
      },
    });

    return userUpdated;
  }
}

export { EditUserService };
