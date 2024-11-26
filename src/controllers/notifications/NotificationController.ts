import { Request, Response } from "express";
import { NotificationService } from "../../services/notifications/NotificationService";

export class NotificationController {
  async getNotifications(req: Request, res: Response): Promise<Response> {
    const { sub } = res.locals.decodedToken;
    const notificationService = new NotificationService();
    const notifications = await notificationService.getNotifications(sub);
    return res.status(200).json(notifications);
  }

  async markAsRead(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { sub } = res.locals.decodedToken;
    const notificationService = new NotificationService();
    const markAsRead = await notificationService.markAsRead(id, sub);
    return res.status(200).json(markAsRead);
  }
}
