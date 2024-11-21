import { Router } from "express";
import { ListTagsController } from "../../controllers/tag/ListTagsController";

const tagPublicRoutes = Router();

tagPublicRoutes.get("/", new ListTagsController().handle);

export { tagPublicRoutes };
