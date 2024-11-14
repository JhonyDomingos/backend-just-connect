import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { CreateUserData, NewUserData } from "../../interfaces/user/UserTypes";
import { userRegisteredSchema } from "../../schemas/userSchemas";
import { AppError } from "../../Error/AppError.error";

class CreateUserService {
  async execute(data: CreateUserData): Promise<NewUserData> {
    if (!data.username) {
      throw new AppError("Username incorrect", 400);
    }

    if (!data.email) {
      throw new AppError("Email incorrect", 400);
    }

    const usernameAlreadyExists = await prismaClient.user.findFirst({
      where: { username: data.username },
    });

    if (usernameAlreadyExists) {
      throw new AppError("Username already exists", 400);
    }

    const emailAlreadyRegistered = await prismaClient.user.findFirst({
      where: { email: data.email },
    });

    if (emailAlreadyRegistered) {
      throw new AppError("Email is already registered", 400);
    }

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
