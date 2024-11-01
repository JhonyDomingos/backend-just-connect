import { Router } from 'express';
import { CreateCommentController } from '../../controllers/comments/CreateCommentController';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated'; 
import { DeleteCommentController } from '../../controllers/comments/DeleteCommentController';
import { FindAllCommentController } from '../../controllers/comments/FindAllCommentController';
import { UpdateCommentController } from '../../controllers/comments/UpdateCommentController';

const commentPrivateRoutes = Router();

const createCommentController = new CreateCommentController();
const deleteCommentController = new DeleteCommentController();
const findAllCommentController = new FindAllCommentController();
const updateCommentController = new UpdateCommentController();

commentPrivateRoutes.post('/:id', isAuthenticated, (req, res) => createCommentController.create(req, res));

commentPrivateRoutes.put('/:id', isAuthenticated, (req, res) => updateCommentController.update(req, res));

commentPrivateRoutes.delete('/:id', isAuthenticated, (req, res) => deleteCommentController.delete(req, res));

commentPrivateRoutes.get('/', findAllCommentController.handle.bind(findAllCommentController));

export { commentPrivateRoutes };
