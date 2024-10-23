import { Router, Request, Response } from 'express';
import { userPublicRoutes } from './public/user.public.routes';
import { sessionPublicRoutes } from './public/session.public.routes';
import { userPrivateRoutes } from './private/user.private.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

router.use('/users', userPublicRoutes);
router.use('/users', userPrivateRoutes);
router.use('/auth', sessionPublicRoutes);

export { router };
