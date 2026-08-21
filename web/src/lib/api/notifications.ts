import { sbNotifications } from './domains/notifications.service';

export const notificationsApi = {
  getNotifications: () => sbNotifications.list(),
  getUnreadCount: () => sbNotifications.getUnreadCount(),
  markNotificationRead: (id: string) => sbNotifications.markRead(id),
  markAllNotificationsRead: () => sbNotifications.markAllRead(),
};