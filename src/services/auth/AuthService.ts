import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { AppError } from "../../Error/AppError.error";
import { AuthMessagesEnum } from "../../Error/Enums/AuthMessage.enum";
import { FieldMessagesEnum } from "../../Error/Enums/FieldErrors.enum";
import { UserMessagesEnum } from "../../Error/Enums/UserMessage.enum";
import { LoginData, ResetPasswordData } from "../../interfaces/auth/AuthTypes";
import { prismaClient } from "../../prisma/index";

class AuthService {
  async execute(data: LoginData) {
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          data.email ? { email: data.email } : undefined,
          data.username ? { username: data.username } : undefined,
        ].filter(Boolean) as { email?: string; username?: string }[],
      },
    });

    if (!user) {
      throw new AppError(UserMessagesEnum.INCORRECT_CREDENTIALS, 401);
    }

    const passwordMatch = await compare(data.password, user?.password);

    if (!passwordMatch) {
      throw new AppError(UserMessagesEnum.INCORRECT_CREDENTIALS, 401);
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
      throw new AppError({ email: [FieldMessagesEnum.INVALID_EMAIL] }, 404);
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

  async resetPassword(data: ResetPasswordData) {
    const { userId } = verify(data.token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (
      !user ||
      user.reset_token !== data.token ||
      user.reset_token_expiry! < new Date()
    ) {
      throw new AppError(
        { token: [AuthMessagesEnum.INVALID_OR_EXIPRED_TOKEN] },
        401
      );
    }

    const newPasswordHash = await hash(data.newPassword, 10);

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
