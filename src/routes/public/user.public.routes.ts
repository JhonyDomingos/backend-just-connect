import { Router, Request, Response } from 'express';
import { FindAllUserController } from '../../controllers/user/FindAllUserController';
import { FindUserController } from '../../controllers/user/FindUserController';
import { CreateUserController } from '../../controllers/user/CreateUserController';
import { GetUserByUsernameController } from '../../controllers/user/GetUserByUsernameController';

const userPublicRoutes: Router = Router();

userPublicRoutes.post('/register', new CreateUserController().handle); // register new user
userPublicRoutes.get('/:id', new FindUserController().handle); // find user by id
userPublicRoutes.get('/user/:username', new GetUserByUsernameController().handle); // find user by username
userPublicRoutes.get('/', new FindAllUserController().handle); // lists all users

export { userPublicRoutes };