import { Router } from "express";
import { CreatePostController } from "../../controllers/post/CreatePostController";
import { UpdatePostController } from "../../controllers/post/UpdatePostController";
import { DeletePostController } from "../../controllers/post/DeletePostController";
import { StatusPostController } from "../../controllers/post/StatusPostController";
import { LikePostController } from "../../controllers/post/LikePostController";

import { createPostSchema } from "../../schemas/postSchemas";
import { updatePostSchema } from "../../schemas/postSchemas";
import { likePostSchema } from "../../schemas/postSchemas";
import { authMiddleware } from "../../middlewares/auth/Auth.middleware";
import { ensureMiddleware } from "../../middlewares/ensure/ensure.middleware";
import { CommonMessagesEnum } from "../../Error/Enums/CommonMesages.enum";
import { permissionsMiddleware } from "../../middlewares/Permissions/Permission.middleware";

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

postsPrivateRoutes.post(
  "/",
  ensureMiddleware.validateBody(createPostSchema),
  new CreatePostController().create
);

postsPrivateRoutes.use(
  "/:id",
  ensureMiddleware.existingParams({
    error: CommonMessagesEnum.NOT_FOUND,
    model: "post",
    searchKey: "id",
  })
);

postsPrivateRoutes.put(
  "/:id/status",
  permissionsMiddleware.canAdministerPost,
  new StatusPostController().change
);
postsPrivateRoutes.put(
  "/:id",
  ensureMiddleware.validateBody(updatePostSchema),
  permissionsMiddleware.canEditPost,
  new UpdatePostController().update
);
postsPrivateRoutes.delete(
  "/:id",
  permissionsMiddleware.canAdministerPost,
  new DeletePostController().delete
);

const likePostController = new LikePostController();
postsPrivateRoutes.post("/:postId/like", (req, res, next) => likePostController.likePost(req, res, next));
postsPrivateRoutes.post("/:postId/dislike", (req, res, next) => likePostController.dislikePost(req, res, next));

export { postsPrivateRoutes };
