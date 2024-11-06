import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated'; 
import { CreateTagController } from '../../controllers/tag/CreateTagController';
import { authMiddleware } from '../../middlewares/auth/Auth.middleware';

const tagPrivateRoutes = Router();

const createTagController = new CreateTagController();

tagPrivateRoutes.post('/', authMiddleware, createTagController.create)

export { tagPrivateRoutes };