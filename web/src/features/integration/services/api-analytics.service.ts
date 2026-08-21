import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgApiAnalyticsError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createApiAnalyticsService(repository: EnterpriseIntegrationRepository) {
  return {
    async getApiAnalytics(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Getting API analytics', { schoolId, userId }, 'ApiAnalyticsService');
        const result = await repository.getApiAnalytics(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to get API analytics', { schoolId, error }, 'ApiAnalyticsService');
        throw error;
      }
    },

    async getEndpointAnalytics(schoolId: string, userId: string, endpoint: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting endpoint analytics', { schoolId, userId, endpoint }, 'ApiAnalyticsService');
        const result = await repository.getEndpointAnalytics(schoolId, endpoint, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get endpoint analytics', { schoolId, endpoint, error }, 'ApiAnalyticsService');
        throw error;
      }
    },

    async getUsageStats(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting usage stats', { schoolId, userId }, 'ApiAnalyticsService');
        const result = await repository.getUsageStats(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get usage stats', { schoolId, error }, 'ApiAnalyticsService');
        throw error;
      }
    },

    async getErrorStats(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting error stats', { schoolId, userId }, 'ApiAnalyticsService');
        const result = await repository.getErrorStats(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get error stats', { schoolId, error }, 'ApiAnalyticsService');
        throw error;
      }
    },

    async getPerformanceMetrics(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting performance metrics', { schoolId, userId }, 'ApiAnalyticsService');
        const result = await repository.getPerformanceMetrics(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get performance metrics', { schoolId, error }, 'ApiAnalyticsService');
        throw error;
      }
    },

    async getTopEndpoints(schoolId: string, userId: string, limit: number) {
      try {
        logger.info('Getting top endpoints', { schoolId, userId, limit }, 'ApiAnalyticsService');
        const result = await repository.getTopEndpoints(schoolId, limit);
        return result;
      } catch (error) {
        logger.error('Failed to get top endpoints', { schoolId, limit, error }, 'ApiAnalyticsService');
        throw error;
      }
    },

    async getHourlyTraffic(schoolId: string, userId: string, date: string) {
      try {
        logger.info('Getting hourly traffic', { schoolId, userId, date }, 'ApiAnalyticsService');
        const result = await repository.getHourlyTraffic(schoolId, date);
        return result;
      } catch (error) {
        logger.error('Failed to get hourly traffic', { schoolId, date, error }, 'ApiAnalyticsService');
        throw error;
      }
    },
  };
}