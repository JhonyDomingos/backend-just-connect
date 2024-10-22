import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from '../../prisma/index';
import { AuthRequest } from '../../interfaces/auth/authRequest';

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
            throw new Error('Incorrect user (email or username)');
        }

        const passwordMatch = await compare(password, user?.password);

        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
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
          token: token
        };
    }
}

export { AuthService };