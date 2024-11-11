import { Router } from 'express';
import { FindAllPostController } from '../../controllers/post/FindAllPostController';
import { FindOnePostController } from '../../controllers/post/FindOnePostController';
import { FindAllPostUserController } from '../../controllers/post/FindAllPostUserController';
import { FindAllPostUsernameController } from '../../controllers/post/FindAllPostUsernameController';
import { FindPostsByTagController } from '../../controllers/post/FindPostsByTagController';

/**
 * @module postsPublicRoutes
 * @description Defines the public routes for accessing posts in the application.
 * Routes include:
 * - GET /: Retrieve all posts.
 * - GET /:id: Retrieve a specific post by its ID.
 * 
 * Controllers:
 * - FindAllPostController: Handles the retrieval of all posts.
 * - FindOnePostController: Handles the retrieval of a specific post.
 */
const postsPublicRoutes: Router = Router();

postsPublicRoutes.get('/',  new FindAllPostController().findAll);
postsPublicRoutes.get('/:id', new FindOnePostController().findOne);
postsPublicRoutes.get('/user/:userId', new FindAllPostUserController().findAll);
postsPublicRoutes.get('/profile/:username',  new FindAllPostUsernameController().findAll);
postsPublicRoutes.get('/tagged-with/:tag', new FindPostsByTagController().tagged)

export { postsPublicRoutes };