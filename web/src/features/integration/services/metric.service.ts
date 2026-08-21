import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgMetricError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createMetricService(repository: EnterpriseIntegrationRepository) {
  return {
    async createMetric(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating metric', { schoolId, userId }, 'MetricService');
        const result = await repository.createMetric(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create metric', { schoolId, error }, 'MetricService');
        throw error;
      }
    },

    async queryMetrics(schoolId: string, userId: string, query: Record<string, unknown>) {
      try {
        logger.info('Querying metrics', { schoolId, userId }, 'MetricService');
        const result = await repository.queryMetrics(schoolId, query);
        return result;
      } catch (error) {
        logger.error('Failed to query metrics', { schoolId, error }, 'MetricService');
        throw error;
      }
    },

    async getMetric(schoolId: string, userId: string, metricId: string) {
      try {
        logger.info('Getting metric', { schoolId, userId, metricId }, 'MetricService');
        const result = await repository.getMetric(schoolId, metricId);
        return result;
      } catch (error) {
        logger.error('Failed to get metric', { schoolId, metricId, error }, 'MetricService');
        throw error;
      }
    },

    async listMetrics(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing metrics', { schoolId, userId }, 'MetricService');
        const result = await repository.listMetrics(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list metrics', { schoolId, error }, 'MetricService');
        throw error;
      }
    },

    async deleteMetric(schoolId: string, userId: string, metricId: string) {
      try {
        logger.info('Deleting metric', { schoolId, userId, metricId }, 'MetricService');
        await repository.deleteMetric(schoolId, metricId);
      } catch (error) {
        logger.error('Failed to delete metric', { schoolId, metricId, error }, 'MetricService');
        throw error;
      }
    },

    async getDashboardMetrics(schoolId: string, userId: string, dashboardId: string) {
      try {
        logger.info('Getting dashboard metrics', { schoolId, userId, dashboardId }, 'MetricService');
        const result = await repository.getDashboardMetrics(schoolId, dashboardId);
        return result;
      } catch (error) {
        logger.error('Failed to get dashboard metrics', { schoolId, dashboardId, error }, 'MetricService');
        throw error;
      }
    },

    async createDashboard(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating dashboard', { schoolId, userId }, 'MetricService');
        const result = await repository.createDashboard(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create dashboard', { schoolId, error }, 'MetricService');
        throw error;
      }
    },

    async listDashboards(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing dashboards', { schoolId, userId }, 'MetricService');
        const result = await repository.listDashboards(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list dashboards', { schoolId, error }, 'MetricService');
        throw error;
      }
    },
  };
}