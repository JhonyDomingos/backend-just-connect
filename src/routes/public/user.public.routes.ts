import { FindAllUserController } from "../../controllers/user/FindAllUserController";
import { FindUserController } from "../../controllers/user/FindUserController";
import { CreateUserController } from "../../controllers/user/CreateUserController";
import { GetUserByUsernameController } from "../../controllers/user/GetUserByUsernameController";
import { ensureMiddleware } from "../../middlewares/ensure/ensure.middleware";
import { UserMessagesEnum } from "../../Error/Enums/UserMessage.enum";
import { userRegisterSchema } from "../../schemas/userSchemas";
import { Router } from "express";

const userPublicRoutes: Router = Router();

userPublicRoutes.post(
  "/register",
  ensureMiddleware.validateBody(userRegisterSchema),
  ensureMiddleware.uniqueUsername,
  ensureMiddleware.uniqueEmail,
  new CreateUserController().handle
);

userPublicRoutes.get(
  "/:id",
  ensureMiddleware.existingParams({
    error: UserMessagesEnum.USER_NOT_FOUND,
    model: "user",
    searchKey: ":id",
  }),
  new FindUserController().handle
);

userPublicRoutes.get(
  "/user/:username",
  ensureMiddleware.existingParams({
    error: UserMessagesEnum.USERNAME_NOT_FOUND,
    model: "user",
    searchKey: "username",
  }),
  new GetUserByUsernameController().handle
);

userPublicRoutes.get("/", new FindAllUserController().handle);

export { userPublicRoutes };
