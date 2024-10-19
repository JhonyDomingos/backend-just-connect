import prismaClient from '../../prisma';
import { UserRequest } from '../../interfaces/user/UserRequest';

class EditUserService {

  async execute({ id, name, username, email, password, bio_description, role, admin_user_block, linkedin, instagram, github }: UserRequest) {

    if (!id) {
      throw new Error('User ID is required to update the user.');
    }
    
    const user = await prismaClient.user.update({
      where: {
        id
      },
      data: {
        name,
        username,
        email,
        password,
        bio_description,
        role,
        admin_user_block,
        linkedin,
        instagram,
        github
      }
    });

    return user;
  }
}

export { EditUserService };