import { Router } from "express";
import { FindAllUserController } from "../../controllers/user/FindAllUserController";
import { FindUserController } from "../../controllers/user/FindUserController";
import { CreateUserController } from "../../controllers/user/CreateUserController";
import { GetUserByUsernameController } from "../../controllers/user/GetUserByUsernameController";
import { ensureMiddleware } from "../../middlewares/ensure/ensure.middleware";
import { UserMessagesEnum } from "../../Error/Enums/UserMessage.enum";
import { createUserSchema } from "../../schemas/userSchemas";



const userPublicRoutes: Router = Router();

userPublicRoutes.post(
  "/register",
  ensureMiddleware.validateBody(createUserSchema),
  ensureMiddleware.uniqueEmail,
  ensureMiddleware.uniqueUsername,
  new CreateUserController().handle
); 
// register new user
userPublicRoutes.get(
  "/:id",
  ensureMiddleware.existingParams({
    error: UserMessagesEnum.USER_NOT_FOUND,
    model: "user",
    searchKey: "id",
  }),
  new FindUserController().handle
); 
// find user by id
userPublicRoutes.get(
  "/user/:username",
  ensureMiddleware.existingParams({
    error: UserMessagesEnum.USERNAME_NOT_FOUND,
    model: "user",
    searchKey: "username",
  }),
  new GetUserByUsernameController().handle
); 
// find user by username
userPublicRoutes.get("/", new FindAllUserController().handle); // lists all users

export { userPublicRoutes };
