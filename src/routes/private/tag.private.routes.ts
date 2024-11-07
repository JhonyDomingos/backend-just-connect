import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated'; 
import { CreateTagController } from '../../controllers/tag/CreateTagController';
import { DeleteTagController } from '../../controllers/tag/DeleteTagController';

const tagPrivateRoutes = Router();

const createTagController = new CreateTagController();

const deleteTagController = new DeleteTagController();

tagPrivateRoutes.post('/', isAuthenticated, createTagController.create)

tagPrivateRoutes.delete('/:id',isAuthenticated,  deleteTagController.delete)

export { tagPrivateRoutes };