import { Router, Request, Response } from 'express';
import { userPublicRoutes } from './public/user.public.routes';
import { sessionPublicRoutes } from './public/session.public.routes';
import { userPrivateRoutes } from './private/user.private.routes';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.send('Hello World');
});

router.use('/public/users', userPublicRoutes);
router.use('/users', userPrivateRoutes);
router.use('/public/auth', sessionPublicRoutes);

export { router };