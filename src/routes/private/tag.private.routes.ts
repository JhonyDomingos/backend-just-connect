import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated'; 
import { CreateTagController } from '../../controllers/tag/CreateTagController';

const tagPrivateRoutes = Router();

const createTagController = new CreateTagController();

tagPrivateRoutes.post('/', isAuthenticated, createTagController.create)

export { tagPrivateRoutes };