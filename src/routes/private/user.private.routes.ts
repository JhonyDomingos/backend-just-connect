import { Router } from "express";
import { EditUserController } from "../../controllers/user/EditUserController";
import { DeleteUserController } from "../../controllers/user/DeleteUserController";
import { GetUserProfileController } from "../../controllers/user/GetUserProfileController";
import { ChangeUserPasswordController } from "../../controllers/user/ChangeUserPasswordController";
import { authMiddleware } from "../../middlewares/auth/Auth.middleware";
import { ensureMiddleware } from "../../middlewares/ensure/ensure.middleware";

const userPrivateRoutes: Router = Router();

// use isAuthenticated on routes
userPrivateRoutes.use(authMiddleware);

// change user password
userPrivateRoutes.put(
  "/change-password",
  new ChangeUserPasswordController().handle
);

// get logged user profile
userPrivateRoutes.get("/my-profile", new GetUserProfileController().handle);

userPrivateRoutes.use(
    "/:id",
  ensureMiddleware.existingParams({
    error: "User not found",
    model: "user",
    searchKey: "id",
  })
);
// edit user
userPrivateRoutes.put("/:id", new EditUserController().handle);

// delete user
userPrivateRoutes.delete("/:id", new DeleteUserController().handle);

export { userPrivateRoutes };
