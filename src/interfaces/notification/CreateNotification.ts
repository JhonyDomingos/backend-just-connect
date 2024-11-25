export interface CreateNotification {
    userId: string;
    type: string;
    username: string;
    message: string;
    relatedId?: string;
  }