import type { CommunicationRepositoryExtended, ScheduledMessage } from '@/features/communication/types';
import { logger } from '@educi/logger';

export function createScheduledMessageService(repository: CommunicationRepositoryExtended) {
  return {
    async scheduleMessage(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.content) throw new Error('message content is required');
        if (!data.scheduledFor) throw new Error('scheduledFor date is required');
        if (!data.conversationId) throw new Error('conversationId is required');

        const scheduledDate = new Date(data.scheduledFor);
        if (scheduledDate <= new Date()) {
          throw new Error('scheduledFor must be in the future');
        }

        logger.info('Scheduling message', { schoolId, userId, conversationId: data.conversationId }, 'ScheduledMessageService');

        const scheduledMessage = await repository.scheduleMessage({
          ...data,
          schoolId,
          createdBy: userId,
          status: 'scheduled',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'message.scheduled', {
          scheduledMessageId: scheduledMessage.id,
          userId,
          scheduledFor: data.scheduledFor,
        });

        logger.info('Message scheduled', { scheduledMessageId: scheduledMessage.id }, 'ScheduledMessageService');

        return scheduledMessage;
      } catch (error) {
        logger.error('Failed to schedule message', { schoolId }, 'ScheduledMessageService');
        throw error;
      }
    },

    async cancelScheduledMessage(scheduledMessageId: string, userId: string) {
      try {
        if (!scheduledMessageId) throw new Error('scheduledMessageId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Cancelling scheduled message', { scheduledMessageId, userId }, 'ScheduledMessageService');

        const existing = await repository.getScheduledMessage(scheduledMessageId);
        if (!existing) throw new Error('Scheduled message not found');
        if ((existing as any).status === 'sent') throw new Error('Cannot cancel a sent message');

        const updated = await repository.updateScheduledMessage(scheduledMessageId, {
          status: 'cancelled',
          cancelledAt: new Date().toISOString(),
          cancelledBy: userId,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'message.schedule_cancelled', {
          scheduledMessageId,
          userId,
        });

        logger.info('Scheduled message cancelled', { scheduledMessageId }, 'ScheduledMessageService');

        return updated;
      } catch (error) {
        logger.error('Failed to cancel scheduled message', { scheduledMessageId }, 'ScheduledMessageService');
        throw error;
      }
    },

    async getScheduledMessages(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching scheduled messages', { schoolId, userId }, 'ScheduledMessageService');

        const messages = await repository.getScheduledMessages(schoolId, userId, filters);

        logger.info('Scheduled messages fetched', { schoolId, count: messages.length }, 'ScheduledMessageService');

        return messages;
      } catch (error) {
        logger.error('Failed to fetch scheduled messages', { schoolId }, 'ScheduledMessageService');
        throw error;
      }
    },
  };
}
