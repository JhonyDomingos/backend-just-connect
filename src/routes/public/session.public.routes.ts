import { Router } from 'express';
import { AuthController } from '../../controllers/auth/AuthController';
import { ensureMiddleware } from '../../middlewares/ensure/ensure.middleware';
import { loginSchema } from '../../schemas/authSchemas';


const sessionPublicRoutes: Router = Router();

// Auth
sessionPublicRoutes.post('/', ensureMiddleware.validateBody(loginSchema), new AuthController().handle);

export { sessionPublicRoutes };
