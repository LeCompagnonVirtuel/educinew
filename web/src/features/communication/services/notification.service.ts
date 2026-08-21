import type { CommunicationRepositoryExtended, Notification } from '@/features/communication/types';
import {
  CommNotificationNotFoundError,
  CommNotificationPreferenceError,
  CommNotificationChannelError,
  NotificationBatchError,
  NotificationRateLimitError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createNotificationService(repository: CommunicationRepositoryExtended) {
  return {
    async getNotifications(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching notifications', { schoolId, userId }, 'NotificationService');

        const notifications = await repository.getNotifications(schoolId, userId, filters);

        logger.info('Notifications fetched', { schoolId, count: notifications.length }, 'NotificationService');

        return notifications;
      } catch (error) {
        logger.error('Failed to fetch notifications', { schoolId }, 'NotificationService');
        throw error;
      }
    },

    async markNotificationRead(notificationId: string, userId: string) {
      try {
        if (!notificationId) throw new Error('notificationId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Marking notification as read', { notificationId, userId }, 'NotificationService');

        const existing = await repository.getNotification(notificationId);
        if (!existing) throw new CommNotificationNotFoundError(notificationId);

        const updated = await repository.updateNotification(notificationId, {
          read: true,
          readAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'notification.read', {
          notificationId,
          userId,
        });

        logger.info('Notification marked as read', { notificationId }, 'NotificationService');

        return updated;
      } catch (error) {
        logger.error('Failed to mark notification as read', { notificationId }, 'NotificationService');
        throw error;
      }
    },

    async getNotificationPreferences(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching notification preferences', { schoolId, userId }, 'NotificationService');

        const preferences = await repository.getNotificationPreferences(schoolId, userId);

        logger.info('Notification preferences fetched', { schoolId }, 'NotificationService');

        return preferences;
      } catch (error) {
        logger.error('Failed to fetch notification preferences', { schoolId }, 'NotificationService');
        throw error;
      }
    },

    async updateNotificationPreference(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('preference data is required');

        logger.info('Updating notification preference', { schoolId, userId }, 'NotificationService');

        const updated = await repository.updateNotificationPreference(schoolId, userId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'notification.preference_updated', { userId });

        logger.info('Notification preference updated', { schoolId }, 'NotificationService');

        return updated;
      } catch (error) {
        logger.error('Failed to update notification preference', { schoolId }, 'NotificationService');
        throw error;
      }
    },

    async sendNotificationBatch(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.title) throw new Error('notification title is required');
        if (!data.recipients || data.recipients.length === 0) throw new Error('recipients are required');

        logger.info('Sending notification batch', { schoolId, userId, recipientCount: data.recipients.length }, 'NotificationService');

        const batch = await repository.sendNotificationBatch({
          ...data,
          schoolId,
          createdBy: userId,
          status: 'sending',
          sentAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'notification.batch_sent', {
          userId,
          recipientCount: data.recipients.length,
        });

        logger.info('Notification batch sent', { schoolId, count: data.recipients.length }, 'NotificationService');

        return batch;
      } catch (error) {
        logger.error('Failed to send notification batch', { schoolId }, 'NotificationService');
        throw error;
      }
    },

    async getNotificationStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching notification stats', { schoolId, dateFrom, dateTo }, 'NotificationService');

        const stats = await repository.getNotificationStats(schoolId, dateFrom, dateTo);

        logger.info('Notification stats fetched', { schoolId }, 'NotificationService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch notification stats', { schoolId }, 'NotificationService');
        throw error;
      }
    },
  };
}
