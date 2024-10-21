import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
import { UserRequest } from '../../interfaces/user/UserRequest';

class EditUserService {
  
  async execute({ id, name, username, email, password, bio_description, role, admin_user_block, linkedin, instagram, github }: UserRequest) {
    if (!id) {
      throw new Error('ID incorrect');
    }

    if (!username) {
      throw new Error('Username incorrect');
    }

    if (!email) {
      throw new Error('Email incorrect');
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new Error('User does not exists');
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
        username: username
      }
    });


    const passwordHash = await hash(password, 10);

    const userUpdated = await prismaClient.user.update({
      where: {
        id: id
      },
      data: {
        name,
        username,
        email,
        password: passwordHash,
        bio_description,
        role,
        admin_user_block,
        linkedin,
        instagram,
        github
      }
    });

    return userUpdated;
  }
}

export { EditUserService };