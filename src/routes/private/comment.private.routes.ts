import { Router } from "express";
import { CreateCommentController } from "../../controllers/comments/CreateCommentController";
import { DeleteCommentController } from "../../controllers/comments/DeleteCommentController";
import { FindAllCommentController } from "../../controllers/comments/FindAllCommentController";
import { UpdateCommentController } from "../../controllers/comments/UpdateCommentController";
import { authMiddleware } from "../../middlewares/auth/Auth.middleware";
import { ensureMiddleware } from "../../middlewares/ensure/ensure.middleware";
import { CommonMessagesEnum } from "../../Error/Enums/CommonMesages.enum";

const commentPrivateRoutes = Router();

const createCommentController = new CreateCommentController();
const deleteCommentController = new DeleteCommentController();
const findAllCommentController = new FindAllCommentController();
const updateCommentController = new UpdateCommentController();

commentPrivateRoutes.use(authMiddleware);

commentPrivateRoutes.get("/", findAllCommentController.handle);
commentPrivateRoutes.post("/post/:postId", createCommentController.create);

commentPrivateRoutes.use(
  ensureMiddleware.existingParams({
    error: CommonMessagesEnum.NOT_FOUND,
    model: "comment",
    searchKey: "id",
  })
);
commentPrivateRoutes.put("/:id", updateCommentController.update);
commentPrivateRoutes.delete("/:id", deleteCommentController.delete);

export { commentPrivateRoutes };
