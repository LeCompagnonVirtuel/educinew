import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgAlertError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createAlertService(repository: EnterpriseIntegrationRepository) {
  return {
    async getAlert(schoolId: string, userId: string, alertId: string) {
      try {
        logger.info('Getting alert', { schoolId, userId, alertId }, 'AlertService');
        const result = await repository.getAlert(schoolId, alertId);
        return result;
      } catch (error) {
        logger.error('Failed to get alert', { schoolId, alertId, error }, 'AlertService');
        throw error;
      }
    },

    async listAlerts(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing alerts', { schoolId, userId }, 'AlertService');
        const result = await repository.listAlerts(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list alerts', { schoolId, error }, 'AlertService');
        throw error;
      }
    },

    async createAlert(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating alert', { schoolId, userId }, 'AlertService');
        const result = await repository.createAlert(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create alert', { schoolId, error }, 'AlertService');
        throw error;
      }
    },

    async updateAlert(schoolId: string, userId: string, alertId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating alert', { schoolId, userId, alertId }, 'AlertService');
        const result = await repository.updateAlert(schoolId, alertId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update alert', { schoolId, alertId, error }, 'AlertService');
        throw error;
      }
    },

    async deleteAlert(schoolId: string, userId: string, alertId: string) {
      try {
        logger.info('Deleting alert', { schoolId, userId, alertId }, 'AlertService');
        await repository.deleteAlert(schoolId, alertId);
      } catch (error) {
        logger.error('Failed to delete alert', { schoolId, alertId, error }, 'AlertService');
        throw error;
      }
    },

    async acknowledgeAlert(schoolId: string, userId: string, alertId: string, comment?: string) {
      try {
        logger.info('Acknowledging alert', { schoolId, userId, alertId }, 'AlertService');
        const result = await repository.acknowledgeAlert(schoolId, alertId, comment);
        return result;
      } catch (error) {
        logger.error('Failed to acknowledge alert', { schoolId, alertId, error }, 'AlertService');
        throw error;
      }
    },

    async silenceAlert(schoolId: string, userId: string, alertId: string, duration: number) {
      try {
        logger.info('Silencing alert', { schoolId, userId, alertId, duration }, 'AlertService');
        const result = await repository.silenceAlert(schoolId, alertId, duration);
        return result;
      } catch (error) {
        logger.error('Failed to silence alert', { schoolId, alertId, error }, 'AlertService');
        throw error;
      }
    },

    async getAlertStats(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting alert stats', { schoolId, userId }, 'AlertService');
        const result = await repository.getAlertStats(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get alert stats', { schoolId, error }, 'AlertService');
        throw error;
      }
    },

    async getActiveAlerts(schoolId: string, userId: string) {
      try {
        logger.info('Getting active alerts', { schoolId, userId }, 'AlertService');
        const result = await repository.getActiveAlerts(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get active alerts', { schoolId, error }, 'AlertService');
        throw error;
      }
    },
  };
}