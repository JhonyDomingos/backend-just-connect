import { CreateNotificationData } from "../../interfaces/notification/NotificationTypes";
import prismaClient from "../../prisma";
import { listNotificationsSchema } from "../../schemas/notificationSchemas";

class NotificationService {
  async createNotification(data: CreateNotificationData) {
    return await prismaClient.notification.create({
      data: {
        user_id: data.user_id,
        type: data.type,
        username: data.username,
        message: data.message,
        related_id: data.related_id,
      },
    });
  }

  async getNotifications(userId: string) {
    const notifications = await prismaClient.notification.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc", // mais recentes
      },
    });

    return listNotificationsSchema.parse(notifications);
  }

  async markAsRead(id: string, userId: string) {
    return await prismaClient.notification.update({
      where: {
        id,
        user_id: userId,
      },
      data: { is_read: true },
    });
  }
}

export { NotificationService };
