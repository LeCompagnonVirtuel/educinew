import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgDashboardError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createIntegrationDashboardService(repository: EnterpriseIntegrationRepository) {
  return {
    async getDashboardOverview(schoolId: string, userId: string) {
      try {
        logger.info('Getting dashboard overview', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getDashboardOverview(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get dashboard overview', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getIntegrationStats(schoolId: string, userId: string) {
      try {
        logger.info('Getting integration stats', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getIntegrationStats(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get integration stats', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getWebhookStats(schoolId: string, userId: string) {
      try {
        logger.info('Getting webhook stats', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getWebhookStats(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get webhook stats', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getConnectorStats(schoolId: string, userId: string) {
      try {
        logger.info('Getting connector stats', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getConnectorStats(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get connector stats', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getAiStats(schoolId: string, userId: string) {
      try {
        logger.info('Getting AI stats', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getAiStats(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get AI stats', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getApiUsageStats(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting API usage stats', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getApiUsageStats(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get API usage stats', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getErrorStats(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting error stats', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getErrorStats(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get error stats', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getRecentActivity(schoolId: string, userId: string, limit: number) {
      try {
        logger.info('Getting recent activity', { schoolId, userId, limit }, 'IntegrationDashboardService');
        const result = await repository.getRecentActivity(schoolId, limit);
        return result;
      } catch (error) {
        logger.error('Failed to get recent activity', { schoolId, limit, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getSystemHealth(schoolId: string, userId: string) {
      try {
        logger.info('Getting system health', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getSystemHealth(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get system health', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getAlerts(schoolId: string, userId: string) {
      try {
        logger.info('Getting alerts', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getDashboardAlerts(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get alerts', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },

    async getPerformanceMetrics(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting performance metrics', { schoolId, userId }, 'IntegrationDashboardService');
        const result = await repository.getPerformanceMetrics(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get performance metrics', { schoolId, error }, 'IntegrationDashboardService');
        throw error;
      }
    },
  };
}