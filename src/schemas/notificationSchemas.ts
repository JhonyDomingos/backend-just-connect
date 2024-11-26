import { z } from "zod";

const notificationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.string(),
  username: z.string(),
  message: z.string(),
  is_read: z.boolean(),
  related_id: z.string().uuid(),
  created_at: z.date(),
});

const createNotificationSchema = notificationSchema.omit({
  id: true,
  is_read: true,
  created_at: true,
});

const showNotificationSchema = notificationSchema.omit({ type: true });

const listNotificationsSchema = z.array(showNotificationSchema);

export {
  createNotificationSchema,
  showNotificationSchema,
  listNotificationsSchema,
};
