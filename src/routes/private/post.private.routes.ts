import { Router } from "express";
import { CreatePostController } from "../../controllers/post/CreatePostController";
import { UpdatePostController } from "../../controllers/post/UpdatePostController";
import { DeletePostController } from "../../controllers/post/DeletePostController";
import { StatusPostController } from "../../controllers/post/StatusPostController";

import { createPostSchema } from "../../schemas/postSchemas";
import { updatePostSchema } from "../../schemas/postSchemas";
import { authMiddleware } from "../../middlewares/auth/Auth.middleware";
import { ensureMiddleware } from "../../middlewares/ensure/ensure.middleware";

/**
 * @module postsPrivateRoutes
 * @description Defines the private routes for managing posts in the application.
 * Routes include:
 * - POST /: Create a new post with validation.
 * - PUT /:id: Update an existing post with validation.
 * - DELETE /:id: Delete a specified post.
 * 
 * Middleware:
 * - isAuthenticated: Ensures user is authenticated before accessing the routes.
 * - validateSchema: Validates request bodies against defined schemas for creation and update.
 */
const postsPrivateRoutes: Router = Router();

postsPrivateRoutes.use(authMiddleware);

postsPrivateRoutes.post('/', ensureMiddleware.validateBody(createPostSchema), new CreatePostController().create);
postsPrivateRoutes.put('/:id/status', new StatusPostController().change);
postsPrivateRoutes.put('/:id', ensureMiddleware.validateBody(updatePostSchema), new UpdatePostController().update);
postsPrivateRoutes.delete('/:id', new DeletePostController().delete);

export { postsPrivateRoutes };