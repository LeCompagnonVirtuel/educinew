import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgIntegrationError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createIntegrationService(repository: EnterpriseIntegrationRepository) {
  return {
    async getIntegration(schoolId: string, userId: string, integrationId: string) {
      try {
        logger.info('Getting integration', { schoolId, userId, integrationId }, 'IntegrationService');
        const result = await repository.getIntegration(schoolId, integrationId);
        return result;
      } catch (error) {
        logger.error('Failed to get integration', { schoolId, integrationId, error }, 'IntegrationService');
        throw error;
      }
    },

    async listIntegrations(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing integrations', { schoolId, userId }, 'IntegrationService');
        const result = await repository.listIntegrations(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list integrations', { schoolId, error }, 'IntegrationService');
        throw error;
      }
    },

    async createIntegration(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating integration', { schoolId, userId }, 'IntegrationService');
        const result = await repository.createIntegration(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create integration', { schoolId, error }, 'IntegrationService');
        throw error;
      }
    },

    async updateIntegration(schoolId: string, userId: string, integrationId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating integration', { schoolId, userId, integrationId }, 'IntegrationService');
        const result = await repository.updateIntegration(schoolId, integrationId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update integration', { schoolId, integrationId, error }, 'IntegrationService');
        throw error;
      }
    },

    async deleteIntegration(schoolId: string, userId: string, integrationId: string) {
      try {
        logger.info('Deleting integration', { schoolId, userId, integrationId }, 'IntegrationService');
        await repository.deleteIntegration(schoolId, integrationId);
      } catch (error) {
        logger.error('Failed to delete integration', { schoolId, integrationId, error }, 'IntegrationService');
        throw error;
      }
    },

    async searchIntegrations(schoolId: string, userId: string, query: string) {
      try {
        logger.info('Searching integrations', { schoolId, userId, query }, 'IntegrationService');
        const result = await repository.searchIntegrations(schoolId, query);
        return result;
      } catch (error) {
        logger.error('Failed to search integrations', { schoolId, query, error }, 'IntegrationService');
        throw error;
      }
    },

    async healthCheck(schoolId: string, userId: string, integrationId: string) {
      try {
        logger.info('Running health check', { schoolId, userId, integrationId }, 'IntegrationService');
        const result = await repository.healthCheck(schoolId, integrationId);
        return result;
      } catch (error) {
        logger.error('Failed to run health check', { schoolId, integrationId, error }, 'IntegrationService');
        throw error;
      }
    },

    async enableIntegration(schoolId: string, userId: string, integrationId: string) {
      try {
        logger.info('Enabling integration', { schoolId, userId, integrationId }, 'IntegrationService');
        const result = await repository.enableIntegration(schoolId, integrationId);
        return result;
      } catch (error) {
        logger.error('Failed to enable integration', { schoolId, integrationId, error }, 'IntegrationService');
        throw error;
      }
    },

    async disableIntegration(schoolId: string, userId: string, integrationId: string) {
      try {
        logger.info('Disabling integration', { schoolId, userId, integrationId }, 'IntegrationService');
        const result = await repository.disableIntegration(schoolId, integrationId);
        return result;
      } catch (error) {
        logger.error('Failed to disable integration', { schoolId, integrationId, error }, 'IntegrationService');
        throw error;
      }
    },
  };
}