import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthController } from './controllers/auth/AuthController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

// User Routes
router.post('/users', new CreateUserController().handle);

// Auth Routes
router.post('/auth', new AuthController().handle);

export { router };
