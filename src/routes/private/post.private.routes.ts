import { Router } from "express";
import { CreatePostController } from "../../controllers/post/CreatePostController";
import { UpdatePostController } from "../../controllers/post/UpdatePostController";
import { DeletePostController } from "../../controllers/post/DeletePostController";
import { validateSchema } from "../../middlewares/schema/validateSchema";
import { createPostSchema } from "../../schemas/postSchemas";
import { updatePostSchema } from "../../schemas/postSchemas";
import { isAuthenticated } from "../../middlewares/auth/isAuthenticated";

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
const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();
postsPrivateRoutes.use(isAuthenticated);

postsPrivateRoutes.post('/', validateSchema(createPostSchema), createPostController.create);
postsPrivateRoutes.put('/:id', validateSchema(updatePostSchema), updatePostController.update);
postsPrivateRoutes.delete('/:id', deletePostController.delete);

export { postsPrivateRoutes };