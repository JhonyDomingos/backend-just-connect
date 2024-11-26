import { CreateNotification } from "../../interfaces/notification/CreateNotification";
import prismaClient from "../../prisma";

class NotificationService {
  async createNotification(data: CreateNotification) {
    return await prismaClient.notification.create({
      data: {
        user_id: data.userId,
        type: data.type,
        username: data.username,
        message: data.message,
        related_id: data.relatedId,
      },
    });
  }

  async getNotifications(userId: string) {
    // get nao lidas
    return await prismaClient.notification.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc", // mais recentes
      },
    });
  }

  async markAsRead(id: string, userId: string) {
    // marcar como lida
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
