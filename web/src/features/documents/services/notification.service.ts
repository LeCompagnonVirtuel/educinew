import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCreateError,
  DocDeleteError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createNotificationService(repository: DocumentRepositoryEnterprise) {
  return {
    async getNotifications(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching notifications', { schoolId, userId }, 'NotificationService');

        const notifications = await repository.getNotifications(schoolId, userId);

        logger.info('Notifications fetched successfully', { schoolId, count: notifications.length }, 'NotificationService');

        return notifications;
      } catch (error) {
        logger.error('Failed to fetch notifications', { schoolId, userId, error }, 'NotificationService');
        throw error;
      }
    },

    async createNotification(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.type) throw new DocValidationError('notification type is required');

        logger.info('Creating notification', { schoolId, userId, type: data.type }, 'NotificationService');

        const notification = await repository.createNotification(
          { ...data, userId } as never,
          schoolId
        );

        logger.info('Notification created successfully', { notificationId: notification.id }, 'NotificationService');

        return notification;
      } catch (error) {
        logger.error('Failed to create notification', { schoolId, userId, error }, 'NotificationService');
        throw error;
      }
    },

    async markNotificationRead(notificationId: string, userId: string) {
      try {
        if (!notificationId) throw new DocValidationError('notificationId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Marking notification as read', { notificationId, userId }, 'NotificationService');

        const notification = await repository.markNotificationRead(notificationId);

        logger.info('Notification marked as read', { notificationId }, 'NotificationService');

        return notification;
      } catch (error) {
        logger.error('Failed to mark notification as read', { notificationId, error }, 'NotificationService');
        throw error;
      }
    },

    async markAllNotificationsRead(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Marking all notifications as read', { schoolId, userId }, 'NotificationService');

        await repository.markAllNotificationsRead(schoolId, userId);

        logger.info('All notifications marked as read', { schoolId }, 'NotificationService');
      } catch (error) {
        logger.error('Failed to mark all notifications as read', { schoolId, userId, error }, 'NotificationService');
        throw error;
      }
    },

    async deleteNotification(notificationId: string, userId: string) {
      try {
        if (!notificationId) throw new DocValidationError('notificationId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting notification', { notificationId, userId }, 'NotificationService');

        await repository.deleteNotification(notificationId);

        logger.info('Notification deleted successfully', { notificationId }, 'NotificationService');
      } catch (error) {
        logger.error('Failed to delete notification', { notificationId, error }, 'NotificationService');
        throw error;
      }
    },

    async getUnreadNotificationCount(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching unread notification count', { schoolId, userId }, 'NotificationService');

        const count = await repository.getUnreadNotificationCount(schoolId, userId);

        logger.info('Unread notification count fetched', { schoolId, count }, 'NotificationService');

        return count;
      } catch (error) {
        logger.error('Failed to fetch unread notification count', { schoolId, userId, error }, 'NotificationService');
        throw error;
      }
    },
  };
}
