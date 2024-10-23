import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from '../../prisma/index';
import { AuthRequest } from '../../interfaces/auth/authRequest';
import { AppError } from "../../Error/AppError.error";

class AuthService {
    async execute({email, username, password}: AuthRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                OR: [
                    {
                        email
                    },
                    {
                        username
                    }
                ]
            }
        });

        if (!user) {
            throw new AppError('Incorrect user (email or username)');
        }

        const passwordMatch = await compare(password, user?.password);

        if (!passwordMatch) {
            throw new AppError('Incorrect password');
        }

        if (!process.env.JWT_SECRET!) {
            throw new AppError('JWT_SECRET is not defined');
        }
        const token = sign(
          {
            email: user?.email,
            username: user?.username,
            role: user?.role
          }, 
          process.env.JWT_SECRET as string, {
            subject: user?.id,
            expiresIn: '30d'
        });

        return {
          token: token,
          id: user.id
        };
    }
}

export { AuthService };