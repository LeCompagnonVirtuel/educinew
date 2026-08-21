import type { CommunicationRepositoryExtended, Email } from '@/features/communication/types';
import {
  EmailNotFoundError,
  EmailSendError,
  EmailTemplateNotFoundError,
  EmailCampaignNotFoundError,
  EmailInvalidAddressError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createEmailService(repository: CommunicationRepositoryExtended) {
  return {
    async getEmails(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching emails', { schoolId, userId }, 'EmailService');

        const emails = await repository.getEmails(schoolId, userId, filters);

        logger.info('Emails fetched', { schoolId, count: emails.length }, 'EmailService');

        return emails;
      } catch (error) {
        logger.error('Failed to fetch emails', { schoolId }, 'EmailService');
        throw error;
      }
    },

    async getEmail(emailId: string, userId: string) {
      try {
        if (!emailId) throw new Error('emailId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching email', { emailId, userId }, 'EmailService');

        const email = await repository.getEmail(emailId);
        if (!email) throw new EmailNotFoundError(emailId);

        return email;
      } catch (error) {
        logger.error('Failed to fetch email', { emailId }, 'EmailService');
        throw error;
      }
    },

    async sendEmail(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.to) throw new Error('recipient is required');
        if (!data.subject) throw new Error('subject is required');

        logger.info('Sending email', { schoolId, userId, to: data.to }, 'EmailService');

        const email = await repository.sendEmail({
          ...data,
          schoolId,
          senderId: userId,
          status: 'sent',
          sentAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'email.sent', { emailId: email.id, userId });

        logger.info('Email sent', { emailId: email.id }, 'EmailService');

        return email;
      } catch (error) {
        logger.error('Failed to send email', { schoolId }, 'EmailService');
        throw error;
      }
    },

    async saveDraft(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Saving email draft', { schoolId, userId }, 'EmailService');

        const email = await repository.saveEmailDraft({
          ...data,
          schoolId,
          senderId: userId,
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        logger.info('Email draft saved', { emailId: email.id }, 'EmailService');

        return email;
      } catch (error) {
        logger.error('Failed to save email draft', { schoolId }, 'EmailService');
        throw error;
      }
    },

    async deleteEmail(emailId: string, userId: string) {
      try {
        if (!emailId) throw new Error('emailId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting email', { emailId, userId }, 'EmailService');

        const existing = await repository.getEmail(emailId);
        if (!existing) throw new EmailNotFoundError(emailId);

        await repository.deleteEmail(emailId);

        await repository.logCommunicationEvent(existing.schoolId, 'email.deleted', { emailId, userId });

        logger.info('Email deleted', { emailId }, 'EmailService');
      } catch (error) {
        logger.error('Failed to delete email', { emailId }, 'EmailService');
        throw error;
      }
    },

    async getEmailTemplates(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching email templates', { schoolId, userId }, 'EmailService');

        const templates = await repository.getEmailTemplates(schoolId, filters);

        logger.info('Email templates fetched', { schoolId, count: templates.length }, 'EmailService');

        return templates;
      } catch (error) {
        logger.error('Failed to fetch email templates', { schoolId }, 'EmailService');
        throw error;
      }
    },

    async createEmailTemplate(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.name) throw new Error('template name is required');

        logger.info('Creating email template', { schoolId, userId, name: data.name }, 'EmailService');

        const template = await repository.createEmailTemplate({
          ...data,
          schoolId,
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'email_template.created', { templateId: template.id, userId });

        logger.info('Email template created', { templateId: template.id }, 'EmailService');

        return template;
      } catch (error) {
        logger.error('Failed to create email template', { schoolId }, 'EmailService');
        throw error;
      }
    },

    async updateEmailTemplate(templateId: string, userId: string, data: any) {
      try {
        if (!templateId) throw new Error('templateId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating email template', { templateId, userId }, 'EmailService');

        const updated = await repository.updateEmailTemplate(templateId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        logger.info('Email template updated', { templateId }, 'EmailService');

        return updated;
      } catch (error) {
        logger.error('Failed to update email template', { templateId }, 'EmailService');
        throw error;
      }
    },

    async deleteEmailTemplate(templateId: string, userId: string) {
      try {
        if (!templateId) throw new Error('templateId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting email template', { templateId, userId }, 'EmailService');

        await repository.deleteEmailTemplate(templateId);

        logger.info('Email template deleted', { templateId }, 'EmailService');
      } catch (error) {
        logger.error('Failed to delete email template', { templateId }, 'EmailService');
        throw error;
      }
    },

    async sendCampaign(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.name) throw new Error('campaign name is required');
        if (!data.recipients || data.recipients.length === 0) throw new Error('recipients are required');

        logger.info('Sending email campaign', { schoolId, userId, name: data.name }, 'EmailService');

        const campaign = await repository.sendEmailCampaign({
          ...data,
          schoolId,
          createdBy: userId,
          status: 'sending',
          sentAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'email_campaign.sent', { campaignId: campaign.id, userId });

        logger.info('Email campaign sent', { campaignId: campaign.id }, 'EmailService');

        return campaign;
      } catch (error) {
        logger.error('Failed to send email campaign', { schoolId }, 'EmailService');
        throw error;
      }
    },

    async getEmailCampaigns(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching email campaigns', { schoolId, userId }, 'EmailService');

        const campaigns = await repository.getEmailCampaigns(schoolId, filters);

        logger.info('Email campaigns fetched', { schoolId, count: campaigns.length }, 'EmailService');

        return campaigns;
      } catch (error) {
        logger.error('Failed to fetch email campaigns', { schoolId }, 'EmailService');
        throw error;
      }
    },

    async getEmailSignatures(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching email signatures', { schoolId, userId }, 'EmailService');

        const signatures = await repository.getEmailSignatures(schoolId, userId);

        logger.info('Email signatures fetched', { schoolId, count: signatures.length }, 'EmailService');

        return signatures;
      } catch (error) {
        logger.error('Failed to fetch email signatures', { schoolId }, 'EmailService');
        throw error;
      }
    },

    async getEmailStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching email stats', { schoolId, dateFrom, dateTo }, 'EmailService');

        const stats = await repository.getEmailStats(schoolId, dateFrom, dateTo);

        logger.info('Email stats fetched', { schoolId }, 'EmailService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch email stats', { schoolId }, 'EmailService');
        throw error;
      }
    },
  };
}
