import { Router } from "express";
import { NotificationController } from "../../controllers/notifications/NotificationController";
import { authMiddleware } from "../../middlewares/auth/Auth.middleware";

const notificationRoutes = Router();
const notificationController = new NotificationController();

notificationRoutes.use(authMiddleware);

notificationRoutes.get("/", notificationController.getNotifications);

notificationRoutes.patch(
  "/:id/mark-as-read",
  notificationController.markAsRead
);

export { notificationRoutes };
