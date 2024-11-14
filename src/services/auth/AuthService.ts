import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import prismaClient from "../../prisma/index";
import { AppError } from "../../Error/AppError.error";
import { LoginData } from "../../interfaces/auth/AuthTypes";

class AuthService {
  async execute(data: LoginData) {
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          data.email ? { email: data.email } : undefined,
          data.username ? { username: data.username } : undefined,
        ].filter(Boolean),
      },
    });

    if (!user) {
      throw new AppError("Incorrect user (email or username)");
    }

    const passwordMatch = await compare(data.password, user?.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect password");
    }

    if (!process.env.JWT_SECRET!) {
      throw new AppError("JWT_SECRET is not defined");
    }

    const token = sign(
      {
        email: user?.email,
        username: user?.username,
        role: user?.role,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user?.id,
        expiresIn: "30d",
      }
    );

    return {
      token: token,
      id: user.id,
    };
  }

  async generateResetToken(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("User not found");
    }

    const resetToken = sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "1h",
      }
    );

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        reset_token: resetToken,
        reset_token_expiry: new Date(Date.now() + 3600000),
      },
    });

    return resetToken;
  }

  async resetPassword(token: string, password: string) {
    const { userId } = verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (
      !user ||
      user.reset_token !== token ||
      user.reset_token_expiry! < new Date()
    ) {
      throw new AppError("Invalid or expired token");
    }

    const newPasswordHash = await hash(password, 10);

    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPasswordHash,
        reset_token: null,
        reset_token_expiry: null,
      },
    });
  }
}

export { AuthService };
