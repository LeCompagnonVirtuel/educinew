import type { CommunicationRepositoryExtended, SmsMessage } from '@/features/communication/types';
import {
  SmsNotFoundError,
  SmsSendError,
  SmsTemplateNotFoundError,
  SmsBulkError,
  SmsRateLimitError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createSmsService(repository: CommunicationRepositoryExtended) {
  return {
    async getSmsMessages(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching SMS messages', { schoolId, userId }, 'SmsService');

        const messages = await repository.getSmsMessages(schoolId, userId, filters);

        logger.info('SMS messages fetched', { schoolId, count: messages.length }, 'SmsService');

        return messages;
      } catch (error) {
        logger.error('Failed to fetch SMS messages', { schoolId }, 'SmsService');
        throw error;
      }
    },

    async sendSms(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.to) throw new Error('recipient phone number is required');
        if (!data.message) throw new Error('message content is required');

        logger.info('Sending SMS', { schoolId, userId, to: data.to }, 'SmsService');

        const sms = await repository.sendSms({
          ...data,
          schoolId,
          senderId: userId,
          status: 'sent',
          sentAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'sms.sent', { smsId: sms.id, userId });

        logger.info('SMS sent', { smsId: sms.id }, 'SmsService');

        return sms;
      } catch (error) {
        logger.error('Failed to send SMS', { schoolId }, 'SmsService');
        throw error;
      }
    },

    async sendBulkSms(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.recipients || data.recipients.length === 0) throw new Error('recipients are required');
        if (!data.message) throw new Error('message content is required');

        logger.info('Sending bulk SMS', { schoolId, userId, recipientCount: data.recipients.length }, 'SmsService');

        const bulk = await repository.sendBulkSms({
          ...data,
          schoolId,
          senderId: userId,
          status: 'sending',
          sentAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'sms_bulk.created', { bulkId: bulk.id, userId });

        logger.info('Bulk SMS created', { bulkId: bulk.id }, 'SmsService');

        return bulk;
      } catch (error) {
        logger.error('Failed to send bulk SMS', { schoolId }, 'SmsService');
        throw error;
      }
    },

    async getSmsTemplates(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching SMS templates', { schoolId, userId }, 'SmsService');

        const templates = await repository.getSmsTemplates(schoolId, filters);

        logger.info('SMS templates fetched', { schoolId, count: templates.length }, 'SmsService');

        return templates;
      } catch (error) {
        logger.error('Failed to fetch SMS templates', { schoolId }, 'SmsService');
        throw error;
      }
    },

    async createSmsTemplate(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.name) throw new Error('template name is required');
        if (!data.content) throw new Error('template content is required');

        logger.info('Creating SMS template', { schoolId, userId, name: data.name }, 'SmsService');

        const template = await repository.createSmsTemplate({
          ...data,
          schoolId,
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'sms_template.created', { templateId: template.id, userId });

        logger.info('SMS template created', { templateId: template.id }, 'SmsService');

        return template;
      } catch (error) {
        logger.error('Failed to create SMS template', { schoolId }, 'SmsService');
        throw error;
      }
    },

    async deleteSmsTemplate(templateId: string, userId: string) {
      try {
        if (!templateId) throw new Error('templateId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting SMS template', { templateId, userId }, 'SmsService');

        await repository.deleteSmsTemplate(templateId);

        logger.info('SMS template deleted', { templateId }, 'SmsService');
      } catch (error) {
        logger.error('Failed to delete SMS template', { templateId }, 'SmsService');
        throw error;
      }
    },

    async getSmsStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching SMS stats', { schoolId, dateFrom, dateTo }, 'SmsService');

        const stats = await repository.getSmsStats(schoolId, dateFrom, dateTo);

        logger.info('SMS stats fetched', { schoolId }, 'SmsService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch SMS stats', { schoolId }, 'SmsService');
        throw error;
      }
    },

    async getSmsBulk(schoolId: string, userId: string, bulkId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!bulkId) throw new Error('bulkId is required');

        logger.info('Fetching SMS bulk', { schoolId, userId, bulkId }, 'SmsService');

        const bulk = await repository.getSmsBulk(bulkId);
        if (!bulk) throw new SmsBulkError('Bulk SMS not found');

        logger.info('SMS bulk fetched', { bulkId }, 'SmsService');

        return bulk;
      } catch (error) {
        logger.error('Failed to fetch SMS bulk', { bulkId }, 'SmsService');
        throw error;
      }
    },
  };
}
