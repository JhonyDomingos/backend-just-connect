import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { CreateUserData, NewUserData } from "../../interfaces/user/UserTypes";
import { userRegisteredSchema } from "../../schemas/userSchemas";

class CreateUserService {
  async execute(data: CreateUserData): Promise<NewUserData> {
    const passwordHash = await hash(data.password, 10);

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: passwordHash,
        role: data.role,
      },
    });

    return userRegisteredSchema.parse(user);
  }
}

export { CreateUserService };
