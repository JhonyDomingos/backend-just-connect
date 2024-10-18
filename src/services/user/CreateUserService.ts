import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserRequest } from "../../interfaces/user/UserRequest"

const prisma = new PrismaClient;

class CreateUserService {

  async execute({ name, username, email, password }: UserRequest) {
    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (userAlreadyExists) {
      throw new Error("Email already exists");
    }

    const passwordHash = await hash(password, 10);

    const user = await prisma.user.create({
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