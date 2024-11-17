import prismaClient from "../../prisma";
import { UpdateUserData } from "../../interfaces/user/UserTypes";
import { AppError } from "../../Error/AppError.error";
import { userUpdateSchema } from "../../schemas/userSchemas";

class EditUserService {
  async execute(id: string, data: UpdateUserData): Promise<UpdateUserData> {
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

    return userUpdateSchema.parse(userUpdated);
  }
}

export { EditUserService };
