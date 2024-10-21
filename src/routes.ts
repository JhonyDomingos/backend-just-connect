import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { FindUserController } from './controllers/user/FindUserController';
import { AuthController } from './controllers/auth/AuthController';
import { isAuthenticated } from './middlewares/auth/isAuthenticated';
import { FindAllUserController } from './controllers/user/FindAllUserController';
import { EditUserController } from './controllers/user/EditUserController';
import { DeleteUserController } from './controllers/user/DeleteUserController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

// User Routes
// Create
router.post('/users', new CreateUserController().handle);

// Find by ID (Authenticated)
router.get('/users/:id', isAuthenticated, new FindUserController().handle);

// Find All (Authenticated)
router.get('/users', isAuthenticated, new FindAllUserController().handle);

// Edit (Authenticated)
router.put('/users/:id', isAuthenticated, new EditUserController().handle);

// Delete (Authenticated)
router.delete('/users/:id', isAuthenticated, new DeleteUserController().handle);

// Auth
router.post('/auth', new AuthController().handle);

export { router };
