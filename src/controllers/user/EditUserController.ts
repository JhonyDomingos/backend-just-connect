import { Request, Response } from 'express';
import { EditUserService } from '../../services/user/EditUserService';
import { UserRequest } from '../../interfaces/user/UserRequest';

class EditUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;  
    const { name, username, email, password, bio_description, role, admin_user_block, linkedin, instagram, github }: UserRequest = request.body;
    
    const editUserService = new EditUserService();
    
    try {
      const user = await editUserService.execute({ 
        id, 
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
      });
      
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { EditUserController };
