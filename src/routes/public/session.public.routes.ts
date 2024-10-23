import { Router } from 'express';
import { AuthController } from '../../controllers/auth/AuthController';

const sessionPublicRoutes: Router = Router();

// Auth
sessionPublicRoutes.post('/', new AuthController().handle);

export { sessionPublicRoutes };
