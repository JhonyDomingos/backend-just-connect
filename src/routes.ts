import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { FindUserController } from './controllers/user/FindUserController';
import { AuthController } from './controllers/auth/AuthController';
import { isAuthenticated } from './middlewares/auth/isAuthenticated';


const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

// User Routes
// Create
router.post('/users', new CreateUserController().handle);

// Find by ID
router.get('/users/:id', isAuthenticated, new FindUserController().handle);

// Auth
router.post('/auth', new AuthController().handle);

export { router };
