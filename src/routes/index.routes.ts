import { Router, Request, Response } from 'express';
import { userPublicRoutes } from './public/user.public.routes';
import { sessionPublicRoutes } from './public/session.public.routes';
import { userPrivateRoutes } from './private/user.private.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

router.use('/public/users', userPublicRoutes);
router.use('/users', userPrivateRoutes);
router.use('/public/auth', sessionPublicRoutes);

export { router };

/**
 * Public routes:
 * 
 * POST - /public/users/register - Register user
 * 201 ok created ou 400 bad request
 * 
 * GET - /public/users - List all users
 * 200 ok
 * 
 * GET - /public/users/:id - Get one user
 * 200 ok ou 400 bad request
 * 
 * POST - /public/auth - Login
 * 200 ok ou 400 bad request
 * 
 * Authenticated routes:
 * PUT - /users/:id - Edit user
 * 200 ok ou 400 bad request ou 404 not found ou 401 unauthorized
 * 
 * DELETE - /users/:id - Delete user
 * 204 ok no content ou 400 bad request ou 404 not found ou 401 unauthorized
 */