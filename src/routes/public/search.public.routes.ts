import { NextFunction, Router, Request, Response } from "express";
import { SearchController } from "../../controllers/search/SearchController";

const searchPublicRoutes: Router = Router();

searchPublicRoutes.get("/", (req: Request, res: Response, next: NextFunction) =>
  new SearchController().search(req, res, next)
);

export { searchPublicRoutes };
