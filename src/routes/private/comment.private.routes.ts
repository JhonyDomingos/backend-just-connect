import { Router } from 'express';
import { CreateCommentController } from '../../controllers/comments/CreateCommentController';
import { DeleteCommentController } from '../../controllers/comments/DeleteCommentController';
import { FindAllCommentController } from '../../controllers/comments/FindAllCommentController';
import { UpdateCommentController } from '../../controllers/comments/UpdateCommentController';
import { authMiddleware } from '../../middlewares/auth/Auth.middleware';

const commentPrivateRoutes = Router();

const createCommentController = new CreateCommentController();
const deleteCommentController = new DeleteCommentController();
const findAllCommentController = new FindAllCommentController();
const updateCommentController = new UpdateCommentController();

commentPrivateRoutes.use(authMiddleware)

commentPrivateRoutes.post('/post/:postId', createCommentController.create);
commentPrivateRoutes.put('/:id', updateCommentController.update);
commentPrivateRoutes.delete('/:id', deleteCommentController.delete);
commentPrivateRoutes.get('/', findAllCommentController.handle);

export { commentPrivateRoutes };
