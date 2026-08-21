import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgApiLogError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createApiLogService(repository: EnterpriseIntegrationRepository) {
  return {
    async listApiLogs(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing API logs', { schoolId, userId }, 'ApiLogService');
        const result = await repository.listApiLogs(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list API logs', { schoolId, error }, 'ApiLogService');
        throw error;
      }
    },

    async getApiLog(schoolId: string, userId: string, logId: string) {
      try {
        logger.info('Getting API log', { schoolId, userId, logId }, 'ApiLogService');
        const result = await repository.getApiLog(schoolId, logId);
        return result;
      } catch (error) {
        logger.error('Failed to get API log', { schoolId, logId, error }, 'ApiLogService');
        throw error;
      }
    },

    async getApiLogStats(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting API log stats', { schoolId, userId }, 'ApiLogService');
        const result = await repository.getApiLogStats(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get API log stats', { schoolId, error }, 'ApiLogService');
        throw error;
      }
    },

    async searchApiLogs(schoolId: string, userId: string, query: string) {
      try {
        logger.info('Searching API logs', { schoolId, userId, query }, 'ApiLogService');
        const result = await repository.searchApiLogs(schoolId, query);
        return result;
      } catch (error) {
        logger.error('Failed to search API logs', { schoolId, query, error }, 'ApiLogService');
        throw error;
      }
    },

    async deleteApiLogs(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Deleting API logs', { schoolId, userId }, 'ApiLogService');
        await repository.deleteApiLogs(schoolId, filters);
      } catch (error) {
        logger.error('Failed to delete API logs', { schoolId, error }, 'ApiLogService');
        throw error;
      }
    },

    async getApiLogSummary(schoolId: string, userId: string, endpoint: string) {
      try {
        logger.info('Getting API log summary', { schoolId, userId, endpoint }, 'ApiLogService');
        const result = await repository.getApiLogSummary(schoolId, endpoint);
        return result;
      } catch (error) {
        logger.error('Failed to get API log summary', { schoolId, endpoint, error }, 'ApiLogService');
        throw error;
      }
    },
  };
}