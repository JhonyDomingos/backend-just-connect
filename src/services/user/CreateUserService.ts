import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import {
  CreateUserData,
  NewUserData,
} from "../../interfaces/user/UserTypes";
import { userRegisteredSchema } from "../../schemas/userSchemas";
import { AppError } from "../../Error/AppError.error";

class CreateUserService {
  async execute({
    name,
    username,
    email,
    password,
  }: CreateUserData): Promise<NewUserData> {
    if (!username) {
      throw new AppError("Username incorrect", 400);
    }

    if (!email) {
      throw new AppError("Email incorrect", 400);
    }

    const usernameAlreadyExists = await prismaClient.user.findFirst({
      where: { username },
    });

    if (usernameAlreadyExists) {
      throw new AppError("Username already exists", 400);
    }

    const emailAlreadyRegistered = await prismaClient.user.findFirst({
      where: { email },
    });

    if (emailAlreadyRegistered) {
      throw new AppError("Email is already registered", 400);
    }

    const passwordHash = await hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        name,
        username,
        email,
        password: passwordHash,
      },
    });

    return userRegisteredSchema.parse(user);
  }
}

export { CreateUserService };
