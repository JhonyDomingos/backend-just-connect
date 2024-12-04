import { Router } from "express";
import { CreateTagController } from "../../controllers/tag/CreateTagController";
import { DeleteTagController } from "../../controllers/tag/DeleteTagController";
import { authMiddleware } from "../../middlewares/auth/Auth.middleware";
import { TagFollowController } from "../../controllers/tag/TagFollowController";
import { TagFollowStatusController } from "../../controllers/tag/TagFollowStatusController";
import { GetFollowedTagsPostsController } from "../../controllers/tag/GetFollowedTagsPostsController";

const tagPrivateRoutes = Router();
const createTagController = new CreateTagController();
const deleteTagController = new DeleteTagController();
const tagFollowController = new TagFollowController();
const tagFollowStatusController = new TagFollowStatusController();
const getFollowedTagsPostsController = new GetFollowedTagsPostsController();

tagPrivateRoutes.use(authMiddleware);

tagPrivateRoutes.post("/", createTagController.create);
tagPrivateRoutes.post("/:id", deleteTagController.delete);
tagPrivateRoutes.delete("/unfollow/:tag", tagFollowController.unfollow);
tagPrivateRoutes.post("/follow/:tag", tagFollowController.follow);
tagPrivateRoutes.get("/follow-status/:tag", tagFollowStatusController.handle);
tagPrivateRoutes.post("/follow-unfollow/:tag", tagFollowController.handle);
tagPrivateRoutes.get("/following", getFollowedTagsPostsController.handle);

export { tagPrivateRoutes };
