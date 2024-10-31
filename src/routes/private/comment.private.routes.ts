import { Router } from 'express';
import { CreateCommentController } from '../../controllers/comments/CreateCommentController';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated'; 
import { DeleteCommentController } from '../../controllers/comments/DeleteCommentController';

const commentPrivateRoutes = Router();

const createCommentController = new CreateCommentController();
const deleteCommentController = new DeleteCommentController();


commentPrivateRoutes.post('/:id', isAuthenticated, (req, res) => createCommentController.create(req, res));

// commentPrivateRoutes.put('/:id', isAuthenticated, (req, res) => updateCommentController.update(req, res));

commentPrivateRoutes.delete('/:id', isAuthenticated, (req, res) => deleteCommentController.delete(req, res));

export { commentPrivateRoutes };
