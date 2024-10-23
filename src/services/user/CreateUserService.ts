import prismaClient from '../../prisma';
import { hash } from "bcryptjs";
import { CreateUserData, ReturnUserData } from '../../interfaces/user/UserTypes';
import { userReturnSchema } from '../../schemas/userSchemas';

class CreateUserService {

  async execute({ name, username, email, password }: CreateUserData): Promise<ReturnUserData> {
    if (!username) {
      throw new Error("Username incorrect");
    }

    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
        username: username
      }
    });

    if (userAlreadyExists) {
      throw new Error("Email or Username already exists");
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