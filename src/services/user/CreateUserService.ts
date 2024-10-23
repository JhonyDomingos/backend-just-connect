import prismaClient from '../../prisma';
import { hash } from "bcryptjs";
import { CreateUserData, ReturnUserData } from '../../interfaces/user/UserTypes';
import { userReturnSchema } from '../../schemas/userSchemas';
import { AppError } from '../../Error/AppError.error';

class CreateUserService {

  async execute({ name, username, email, password }: CreateUserData): Promise<ReturnUserData> {
    if (!username) {
      throw new AppError("Username incorrect", 400);
    }

    if (!email) {
      throw new AppError("Email incorrect", 400);
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
        username: username
      }
    });

    if (userAlreadyExists) {
      throw new AppError("Email or Username already exists", 409);
    }

    const passwordHash = await hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        name,
        username,
        email,
        password: passwordHash
      }
    });

    return userReturnSchema.parse(user);
  }
}

export { CreateUserService };