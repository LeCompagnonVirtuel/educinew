import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgDeveloperAppError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createDeveloperAppService(repository: EnterpriseIntegrationRepository) {
  return {
    async getDeveloperApp(schoolId: string, userId: string, appId: string) {
      try {
        logger.info('Getting developer app', { schoolId, userId, appId }, 'DeveloperAppService');
        const result = await repository.getDeveloperApp(schoolId, appId);
        return result;
      } catch (error) {
        logger.error('Failed to get developer app', { schoolId, appId, error }, 'DeveloperAppService');
        throw error;
      }
    },

    async listDeveloperApps(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing developer apps', { schoolId, userId }, 'DeveloperAppService');
        const result = await repository.listDeveloperApps(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list developer apps', { schoolId, error }, 'DeveloperAppService');
        throw error;
      }
    },

    async createDeveloperApp(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating developer app', { schoolId, userId }, 'DeveloperAppService');
        const result = await repository.createDeveloperApp(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create developer app', { schoolId, error }, 'DeveloperAppService');
        throw error;
      }
    },

    async updateDeveloperApp(schoolId: string, userId: string, appId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating developer app', { schoolId, userId, appId }, 'DeveloperAppService');
        const result = await repository.updateDeveloperApp(schoolId, appId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update developer app', { schoolId, appId, error }, 'DeveloperAppService');
        throw error;
      }
    },

    async deleteDeveloperApp(schoolId: string, userId: string, appId: string) {
      try {
        logger.info('Deleting developer app', { schoolId, userId, appId }, 'DeveloperAppService');
        await repository.deleteDeveloperApp(schoolId, appId);
      } catch (error) {
        logger.error('Failed to delete developer app', { schoolId, appId, error }, 'DeveloperAppService');
        throw error;
      }
    },

    async approveDeveloperApp(schoolId: string, userId: string, appId: string, comment?: string) {
      try {
        logger.info('Approving developer app', { schoolId, userId, appId }, 'DeveloperAppService');
        const result = await repository.approveDeveloperApp(schoolId, appId, comment);
        return result;
      } catch (error) {
        logger.error('Failed to approve developer app', { schoolId, appId, error }, 'DeveloperAppService');
        throw error;
      }
    },

    async rejectDeveloperApp(schoolId: string, userId: string, appId: string, reason: string) {
      try {
        logger.info('Rejecting developer app', { schoolId, userId, appId }, 'DeveloperAppService');
        const result = await repository.rejectDeveloperApp(schoolId, appId, reason);
        return result;
      } catch (error) {
        logger.error('Failed to reject developer app', { schoolId, appId, error }, 'DeveloperAppService');
        throw error;
      }
    },

    async getDeveloperAppStats(schoolId: string, userId: string, appId: string) {
      try {
        logger.info('Getting developer app stats', { schoolId, userId, appId }, 'DeveloperAppService');
        const result = await repository.getDeveloperAppStats(schoolId, appId);
        return result;
      } catch (error) {
        logger.error('Failed to get developer app stats', { schoolId, appId, error }, 'DeveloperAppService');
        throw error;
      }
    },
  };
}