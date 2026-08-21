import type { CommunicationRepositoryExtended, PushNotification } from '@/features/communication/types';
import {
  PushNotFoundError,
  PushSendError,
  PushTemplateNotFoundError,
  PushSubscriptionError,
  PushRateLimitError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createPushService(repository: CommunicationRepositoryExtended) {
  return {
    async getPushNotifications(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching push notifications', { schoolId, userId }, 'PushService');

        const notifications = await repository.getPushNotifications(schoolId, userId, filters);

        logger.info('Push notifications fetched', { schoolId, count: notifications.length }, 'PushService');

        return notifications;
      } catch (error) {
        logger.error('Failed to fetch push notifications', { schoolId }, 'PushService');
        throw error;
      }
    },

    async sendPushNotification(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.title) throw new Error('notification title is required');
        if (!data.body) throw new Error('notification body is required');

        logger.info('Sending push notification', { schoolId, userId, title: data.title }, 'PushService');

        const notification = await repository.sendPushNotification({
          ...data,
          schoolId,
          senderId: userId,
          status: 'sent',
          sentAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'push.sent', { notificationId: notification.id, userId });

        logger.info('Push notification sent', { notificationId: notification.id }, 'PushService');

        return notification;
      } catch (error) {
        logger.error('Failed to send push notification', { schoolId }, 'PushService');
        throw error;
      }
    },

    async subscribeToPush(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.endpoint) throw new Error('push endpoint is required');
        if (!data.keys) throw new Error('push keys are required');

        logger.info('Subscribing to push', { schoolId, userId }, 'PushService');

        const subscription = await repository.subscribeToPush({
          ...data,
          schoolId,
          userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'push.subscribed', { userId });

        logger.info('Push subscription created', { userId }, 'PushService');

        return subscription;
      } catch (error) {
        logger.error('Failed to subscribe to push', { schoolId }, 'PushService');
        throw error;
      }
    },

    async unsubscribeFromPush(schoolId: string, userId: string, subscriptionId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!subscriptionId) throw new Error('subscriptionId is required');

        logger.info('Unsubscribing from push', { schoolId, userId, subscriptionId }, 'PushService');

        await repository.unsubscribeFromPush(subscriptionId);

        await repository.logCommunicationEvent(schoolId, 'push.unsubscribed', { userId, subscriptionId });

        logger.info('Push unsubscription completed', { subscriptionId }, 'PushService');
      } catch (error) {
        logger.error('Failed to unsubscribe from push', { subscriptionId }, 'PushService');
        throw error;
      }
    },

    async getPushTemplates(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching push templates', { schoolId, userId }, 'PushService');

        const templates = await repository.getPushTemplates(schoolId, filters);

        logger.info('Push templates fetched', { schoolId, count: templates.length }, 'PushService');

        return templates;
      } catch (error) {
        logger.error('Failed to fetch push templates', { schoolId }, 'PushService');
        throw error;
      }
    },

    async deletePushTemplate(templateId: string, userId: string) {
      try {
        if (!templateId) throw new Error('templateId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting push template', { templateId, userId }, 'PushService');

        await repository.deletePushTemplate(templateId);

        logger.info('Push template deleted', { templateId }, 'PushService');
      } catch (error) {
        logger.error('Failed to delete push template', { templateId }, 'PushService');
        throw error;
      }
    },

    async getPushStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching push stats', { schoolId, dateFrom, dateTo }, 'PushService');

        const stats = await repository.getPushStats(schoolId, dateFrom, dateTo);

        logger.info('Push stats fetched', { schoolId }, 'PushService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch push stats', { schoolId }, 'PushService');
        throw error;
      }
    },

    async sendBulkPush(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.title) throw new Error('notification title is required');
        if (!data.body) throw new Error('notification body is required');
        if (!data.recipients || data.recipients.length === 0) throw new Error('recipients are required');

        logger.info('Sending bulk push', { schoolId, userId, recipientCount: data.recipients.length }, 'PushService');

        const notifications = await repository.sendBulkPush({
          ...data,
          schoolId,
          senderId: userId,
          status: 'sending',
          sentAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'push_bulk.sent', { userId, recipientCount: data.recipients.length });

        logger.info('Bulk push sent', { schoolId, count: data.recipients.length }, 'PushService');

        return notifications;
      } catch (error) {
        logger.error('Failed to send bulk push', { schoolId }, 'PushService');
        throw error;
      }
    },
  };
}
