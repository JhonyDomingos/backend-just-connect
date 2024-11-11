import { Router } from 'express';
import { CreateTagController } from '../../controllers/tag/CreateTagController';
import { DeleteTagController } from '../../controllers/tag/DeleteTagController';
import { authMiddleware } from '../../middlewares/auth/Auth.middleware';

const tagPrivateRoutes = Router();

const createTagController = new CreateTagController();

const deleteTagController = new DeleteTagController();

tagPrivateRoutes.post('/', authMiddleware, createTagController.create)
tagPrivateRoutes.post('/:id', authMiddleware, deleteTagController.delete)

export { tagPrivateRoutes };