import { Router } from "express";
import { LikeCommentController } from "../../controllers/score/LikeCommentController";
import { RemoveLikeCommentController } from "../../controllers/score/RemoveLikeCommentController ";
import { authMiddleware } from "../../middlewares/auth/Auth.middleware";
import { ensureMiddleware } from "../../middlewares/ensure/ensure.middleware";
import { CommonMessagesEnum } from "../../Error/Enums/CommonMesages.enum";

const likeRoutes = Router();

const likeCommentController = new LikeCommentController();
const removeLikeCommentController = new RemoveLikeCommentController();

likeRoutes.use(authMiddleware);

likeRoutes.post("/:commentId/like", likeCommentController.like);

likeRoutes.delete("/:commentId/like", removeLikeCommentController.removeLike);

likeRoutes.use(
  ensureMiddleware.existingParams({
    error: CommonMessagesEnum.NOT_FOUND,
    model: "comment",
    searchKey: "id",
  })
);

export { likeRoutes };