import { Router, Request, Response } from "express";
import { userPublicRoutes } from "./public/user.public.routes";
import { sessionPublicRoutes } from "./public/session.public.routes";
import { userPrivateRoutes } from "./private/user.private.routes";
import { postsPublicRoutes } from "./public/post.public.routes";
import { postsPrivateRoutes } from "./private/post.private.routes";
import { commentPrivateRoutes } from "./private/comment.private.routes";
import { tagPrivateRoutes } from "./private/tag.private.routes";
import { passwordRecoveryRoutes } from "./public/passwordRecovery.routes";
import { searchPublicRoutes } from "./public/search.public.routes";
import { tagPublicRoutes } from "./public/tag.public.routes";
import { notificationRoutes } from "./private/notification.private.routes";

const router: Router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World");
});

router.use("/public/users", userPublicRoutes);
router.use("/public/auth", sessionPublicRoutes);
router.use("/public/auth", passwordRecoveryRoutes);
router.use("/public/posts", postsPublicRoutes);
router.use("/public/search", searchPublicRoutes);
router.use("/public/tags", tagPublicRoutes);

router.use("/users", userPrivateRoutes);
router.use("/posts", postsPrivateRoutes);
router.use("/comments", commentPrivateRoutes);
router.use("/tags", tagPrivateRoutes);
router.use("/notifications", notificationRoutes);

export { router };
