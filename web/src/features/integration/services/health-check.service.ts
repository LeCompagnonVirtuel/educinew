import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgHealthCheckError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createHealthCheckService(repository: EnterpriseIntegrationRepository) {
  return {
    async getHealthCheck(schoolId: string, userId: string, healthCheckId: string) {
      try {
        logger.info('Getting health check', { schoolId, userId, healthCheckId }, 'HealthCheckService');
        const result = await repository.getHealthCheck(schoolId, healthCheckId);
        return result;
      } catch (error) {
        logger.error('Failed to get health check', { schoolId, healthCheckId, error }, 'HealthCheckService');
        throw error;
      }
    },

    async listHealthChecks(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing health checks', { schoolId, userId }, 'HealthCheckService');
        const result = await repository.listHealthChecks(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list health checks', { schoolId, error }, 'HealthCheckService');
        throw error;
      }
    },

    async createHealthCheck(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating health check', { schoolId, userId }, 'HealthCheckService');
        const result = await repository.createHealthCheck(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create health check', { schoolId, error }, 'HealthCheckService');
        throw error;
      }
    },

    async updateHealthCheck(schoolId: string, userId: string, healthCheckId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating health check', { schoolId, userId, healthCheckId }, 'HealthCheckService');
        const result = await repository.updateHealthCheck(schoolId, healthCheckId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update health check', { schoolId, healthCheckId, error }, 'HealthCheckService');
        throw error;
      }
    },

    async deleteHealthCheck(schoolId: string, userId: string, healthCheckId: string) {
      try {
        logger.info('Deleting health check', { schoolId, userId, healthCheckId }, 'HealthCheckService');
        await repository.deleteHealthCheck(schoolId, healthCheckId);
      } catch (error) {
        logger.error('Failed to delete health check', { schoolId, healthCheckId, error }, 'HealthCheckService');
        throw error;
      }
    },

    async runHealthCheck(schoolId: string, userId: string, healthCheckId: string) {
      try {
        logger.info('Running health check', { schoolId, userId, healthCheckId }, 'HealthCheckService');
        const result = await repository.runHealthCheck(schoolId, healthCheckId);
        return result;
      } catch (error) {
        logger.error('Failed to run health check', { schoolId, healthCheckId, error }, 'HealthCheckService');
        throw error;
      }
    },

    async getHealthCheckHistory(schoolId: string, userId: string, healthCheckId: string) {
      try {
        logger.info('Getting health check history', { schoolId, userId, healthCheckId }, 'HealthCheckService');
        const result = await repository.getHealthCheckHistory(schoolId, healthCheckId);
        return result;
      } catch (error) {
        logger.error('Failed to get health check history', { schoolId, healthCheckId, error }, 'HealthCheckService');
        throw error;
      }
    },

    async getOverallHealth(schoolId: string, userId: string) {
      try {
        logger.info('Getting overall health', { schoolId, userId }, 'HealthCheckService');
        const result = await repository.getOverallHealth(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get overall health', { schoolId, error }, 'HealthCheckService');
        throw error;
      }
    },
  };
}