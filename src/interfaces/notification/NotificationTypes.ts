import { z } from "zod";
import {
  createNotificationSchema,
  showNotificationSchema,
} from "../../schemas/notificationSchemas";

type CreateNotificationData = z.infer<typeof createNotificationSchema>;
type ShowNotificationData = z.infer<typeof showNotificationSchema>;

export { CreateNotificationData, ShowNotificationData };
