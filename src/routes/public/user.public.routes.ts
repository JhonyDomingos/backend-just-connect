import { Router, Request, Response } from 'express';
import { FindAllUserController } from '../../controllers/user/FindAllUserController';
import { FindUserController } from '../../controllers/user/FindUserController';
import { CreateUserController } from '../../controllers/user/CreateUserController';

const userPublicRoutes: Router = Router();

// Create user
userPublicRoutes.post('/register', new CreateUserController().handle);

// Find by ID
userPublicRoutes.get('/:id', new FindUserController().handle);

// Find All
userPublicRoutes.get('/', new FindAllUserController().handle);

export { userPublicRoutes };