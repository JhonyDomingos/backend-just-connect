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

commentPrivateRoutes.use(isAuthenticated)

commentPrivateRoutes.post('/post/:postId', createCommentController.create);
commentPrivateRoutes.put('/:id', updateCommentController.update);
commentPrivateRoutes.delete('/:id', deleteCommentController.delete);
commentPrivateRoutes.get('/', findAllCommentController.handle);

export { commentPrivateRoutes };
