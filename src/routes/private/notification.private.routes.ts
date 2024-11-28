import { Router } from "express";
import { NotificationController } from "../../controllers/notifications/NotificationController";
import { authMiddleware } from "../../middlewares/auth/Auth.middleware";
import { SSEController } from "../../controllers/notifications/SSEController";

const notificationRoutes = Router();
const notificationController = new NotificationController();
const sseController = new SSEController();

notificationRoutes.use(authMiddleware);

notificationRoutes.get("/", notificationController.getNotifications);

notificationRoutes.patch(
  "/:id/mark-as-read",
  notificationController.markAsRead
);

notificationRoutes.get('/stream', sseController.streamNotifications)

export { notificationRoutes };
