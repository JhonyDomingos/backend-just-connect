import prismaClient from '../../prisma';
import { hash } from "bcryptjs";
import { UserRequest } from "../../interfaces/user/UserRequest"

class CreateUserService {

  async execute({ name, username, email, password }: UserRequest) {
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
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true
      }
    });
    return user;
  }
}

export { CreateUserService };