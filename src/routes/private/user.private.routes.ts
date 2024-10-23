import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated';
import { EditUserController } from '../../controllers/user/EditUserController';
import { DeleteUserController } from '../../controllers/user/DeleteUserController';

const userPrivateRoutes: Router = Router();

// use isAuthenticated on routes
userPrivateRoutes.use(isAuthenticated)

// edit user
userPrivateRoutes.put('/:id', new EditUserController().handle);

// delete user
userPrivateRoutes.delete('/:id', new DeleteUserController().handle);

export { userPrivateRoutes };