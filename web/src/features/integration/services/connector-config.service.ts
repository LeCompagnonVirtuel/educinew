import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgConnectorConfigError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createConnectorConfigService(repository: EnterpriseIntegrationRepository) {
  return {
    async getConnectorConfig(schoolId: string, userId: string, configId: string) {
      try {
        logger.info('Getting connector config', { schoolId, userId, configId }, 'ConnectorConfigService');
        const result = await repository.getConnectorConfig(schoolId, configId);
        return result;
      } catch (error) {
        logger.error('Failed to get connector config', { schoolId, configId, error }, 'ConnectorConfigService');
        throw error;
      }
    },

    async listConnectorConfigs(schoolId: string, userId: string, connectorId: string) {
      try {
        logger.info('Listing connector configs', { schoolId, userId, connectorId }, 'ConnectorConfigService');
        const result = await repository.listConnectorConfigs(schoolId, connectorId);
        return result;
      } catch (error) {
        logger.error('Failed to list connector configs', { schoolId, connectorId, error }, 'ConnectorConfigService');
        throw error;
      }
    },

    async createConnectorConfig(schoolId: string, userId: string, connectorId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating connector config', { schoolId, userId, connectorId }, 'ConnectorConfigService');
        const result = await repository.createConnectorConfig(schoolId, connectorId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create connector config', { schoolId, connectorId, error }, 'ConnectorConfigService');
        throw error;
      }
    },

    async updateConnectorConfig(schoolId: string, userId: string, configId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating connector config', { schoolId, userId, configId }, 'ConnectorConfigService');
        const result = await repository.updateConnectorConfig(schoolId, configId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update connector config', { schoolId, configId, error }, 'ConnectorConfigService');
        throw error;
      }
    },

    async deleteConnectorConfig(schoolId: string, userId: string, configId: string) {
      try {
        logger.info('Deleting connector config', { schoolId, userId, configId }, 'ConnectorConfigService');
        await repository.deleteConnectorConfig(schoolId, configId);
      } catch (error) {
        logger.error('Failed to delete connector config', { schoolId, configId, error }, 'ConnectorConfigService');
        throw error;
      }
    },

    async validateConnectorConfig(schoolId: string, userId: string, configId: string) {
      try {
        logger.info('Validating connector config', { schoolId, userId, configId }, 'ConnectorConfigService');
        const result = await repository.validateConnectorConfig(schoolId, configId);
        return result;
      } catch (error) {
        logger.error('Failed to validate connector config', { schoolId, configId, error }, 'ConnectorConfigService');
        throw error;
      }
    },

    async testConnectorConfig(schoolId: string, userId: string, configId: string) {
      try {
        logger.info('Testing connector config', { schoolId, userId, configId }, 'ConnectorConfigService');
        const result = await repository.testConnectorConfig(schoolId, configId);
        return result;
      } catch (error) {
        logger.error('Failed to test connector config', { schoolId, configId, error }, 'ConnectorConfigService');
        throw error;
      }
    },
  };
}