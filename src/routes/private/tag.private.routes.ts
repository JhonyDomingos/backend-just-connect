import { Router } from "express";
import { CreateTagController } from "../../controllers/tag/CreateTagController";
import { DeleteTagController } from "../../controllers/tag/DeleteTagController";
import { authMiddleware } from "../../middlewares/auth/Auth.middleware";
import { TagFollowController } from "../../controllers/tag/TagFollowController";
import { TagFollowStatusController } from "../../controllers/tag/TagFollowStatusController";

const tagPrivateRoutes = Router();
const createTagController = new CreateTagController();
const deleteTagController = new DeleteTagController();
const tagFollowController = new TagFollowController();
const tagFollowStatusController = new TagFollowStatusController();

tagPrivateRoutes.use(authMiddleware);

tagPrivateRoutes.post("/", createTagController.create);
tagPrivateRoutes.post("/:id", deleteTagController.delete);
tagPrivateRoutes.delete("/unfollow/:tag", tagFollowController.unfollow);
tagPrivateRoutes.post("/follow/:tag", tagFollowController.follow);
tagPrivateRoutes.get("/follow-status/:tag", tagFollowStatusController.handle);
tagPrivateRoutes.post("/follow-unfollow/:tag", tagFollowController.handle);

export { tagPrivateRoutes };
