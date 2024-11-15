import { Router } from 'express';
import { SearchController } from '../../controllers/search/SearchController';

const searchPublicRoutes: Router = Router();

searchPublicRoutes.get('/', (req, res, next) => new SearchController().search(req, res, next));

export { searchPublicRoutes };


// const router = Router();
// const searchController = new SearchController();

// router.get('/', (req, res, next) => searchController.search(req, res, next));

// export { router as searchRoutes };
