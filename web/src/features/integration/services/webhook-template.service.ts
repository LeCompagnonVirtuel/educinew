import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgWebhookTemplateError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createWebhookTemplateService(repository: EnterpriseIntegrationRepository) {
  return {
    async getWebhookTemplate(schoolId: string, userId: string, templateId: string) {
      try {
        logger.info('Getting webhook template', { schoolId, userId, templateId }, 'WebhookTemplateService');
        const result = await repository.getWebhookTemplate(schoolId, templateId);
        return result;
      } catch (error) {
        logger.error('Failed to get webhook template', { schoolId, templateId, error }, 'WebhookTemplateService');
        throw error;
      }
    },

    async listWebhookTemplates(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing webhook templates', { schoolId, userId }, 'WebhookTemplateService');
        const result = await repository.listWebhookTemplates(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list webhook templates', { schoolId, error }, 'WebhookTemplateService');
        throw error;
      }
    },

    async createWebhookTemplate(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating webhook template', { schoolId, userId }, 'WebhookTemplateService');
        const result = await repository.createWebhookTemplate(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create webhook template', { schoolId, error }, 'WebhookTemplateService');
        throw error;
      }
    },

    async updateWebhookTemplate(schoolId: string, userId: string, templateId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating webhook template', { schoolId, userId, templateId }, 'WebhookTemplateService');
        const result = await repository.updateWebhookTemplate(schoolId, templateId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update webhook template', { schoolId, templateId, error }, 'WebhookTemplateService');
        throw error;
      }
    },

    async deleteWebhookTemplate(schoolId: string, userId: string, templateId: string) {
      try {
        logger.info('Deleting webhook template', { schoolId, userId, templateId }, 'WebhookTemplateService');
        await repository.deleteWebhookTemplate(schoolId, templateId);
      } catch (error) {
        logger.error('Failed to delete webhook template', { schoolId, templateId, error }, 'WebhookTemplateService');
        throw error;
      }
    },

    async validateWebhookTemplate(schoolId: string, userId: string, templateId: string) {
      try {
        logger.info('Validating webhook template', { schoolId, userId, templateId }, 'WebhookTemplateService');
        const result = await repository.validateWebhookTemplate(schoolId, templateId);
        return result;
      } catch (error) {
        logger.error('Failed to validate webhook template', { schoolId, templateId, error }, 'WebhookTemplateService');
        throw error;
      }
    },
  };
}