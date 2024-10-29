import { Role } from '@prisma/client'

export interface UserRequest {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bio_description: string;
  role: Role;
  admin_user_block: boolean;
  linkedin: string;
  instagram: string;
  github: string;
}