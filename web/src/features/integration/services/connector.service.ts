import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgConnectorError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createConnectorService(repository: EnterpriseIntegrationRepository) {
  return {
    async getConnector(schoolId: string, userId: string, connectorId: string) {
      try {
        logger.info('Getting connector', { schoolId, userId, connectorId }, 'ConnectorService');
        const result = await repository.getConnector(schoolId, connectorId);
        return result;
      } catch (error) {
        logger.error('Failed to get connector', { schoolId, connectorId, error }, 'ConnectorService');
        throw error;
      }
    },

    async listConnectors(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing connectors', { schoolId, userId }, 'ConnectorService');
        const result = await repository.listConnectors(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list connectors', { schoolId, error }, 'ConnectorService');
        throw error;
      }
    },

    async createConnector(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating connector', { schoolId, userId }, 'ConnectorService');
        const result = await repository.createConnector(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create connector', { schoolId, error }, 'ConnectorService');
        throw error;
      }
    },

    async updateConnector(schoolId: string, userId: string, connectorId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating connector', { schoolId, userId, connectorId }, 'ConnectorService');
        const result = await repository.updateConnector(schoolId, connectorId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update connector', { schoolId, connectorId, error }, 'ConnectorService');
        throw error;
      }
    },

    async deleteConnector(schoolId: string, userId: string, connectorId: string) {
      try {
        logger.info('Deleting connector', { schoolId, userId, connectorId }, 'ConnectorService');
        await repository.deleteConnector(schoolId, connectorId);
      } catch (error) {
        logger.error('Failed to delete connector', { schoolId, connectorId, error }, 'ConnectorService');
        throw error;
      }
    },

    async syncConnector(schoolId: string, userId: string, connectorId: string) {
      try {
        logger.info('Syncing connector', { schoolId, userId, connectorId }, 'ConnectorService');
        const result = await repository.syncConnector(schoolId, connectorId);
        return result;
      } catch (error) {
        logger.error('Failed to sync connector', { schoolId, connectorId, error }, 'ConnectorService');
        throw error;
      }
    },

    async getConnectorHealth(schoolId: string, userId: string, connectorId: string) {
      try {
        logger.info('Getting connector health', { schoolId, userId, connectorId }, 'ConnectorService');
        const result = await repository.getConnectorHealth(schoolId, connectorId);
        return result;
      } catch (error) {
        logger.error('Failed to get connector health', { schoolId, connectorId, error }, 'ConnectorService');
        throw error;
      }
    },

    async testConnector(schoolId: string, userId: string, connectorId: string) {
      try {
        logger.info('Testing connector', { schoolId, userId, connectorId }, 'ConnectorService');
        const result = await repository.testConnector(schoolId, connectorId);
        return result;
      } catch (error) {
        logger.error('Failed to test connector', { schoolId, connectorId, error }, 'ConnectorService');
        throw error;
      }
    },
  };
}