import { Response } from "express";
import { ShowNotificationData } from "../../interfaces/notification/NotificationTypes";

class SSEService {
  private static clients: Map<string, Response> = new Map();

  static addClient(userId: string, res: Response): void {
    this.clients.set(userId, res);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.write(
      `data: ${JSON.stringify({ message: "Conexão SSE estabelecida." })}\n\n`
    );
  }

  static removeClient(userId: string): void {
    this.clients.delete(userId);
  }

  static sendNotificationToUser(
    notification: ShowNotificationData
  ): void {
    const client = this.clients.get(notification.user_id);
    if (client) {
      client.write(`data: ${JSON.stringify(notification)}\n\n`);
    }
  }
}

export { SSEService };
