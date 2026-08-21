import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgPluginError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createPluginService(repository: EnterpriseIntegrationRepository) {
  return {
    async listPlugins(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing plugins', { schoolId, userId }, 'PluginService');
        const result = await repository.listPlugins(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list plugins', { schoolId, error }, 'PluginService');
        throw error;
      }
    },

    async getPlugin(schoolId: string, userId: string, pluginId: string) {
      try {
        logger.info('Getting plugin', { schoolId, userId, pluginId }, 'PluginService');
        const result = await repository.getPlugin(schoolId, pluginId);
        return result;
      } catch (error) {
        logger.error('Failed to get plugin', { schoolId, pluginId, error }, 'PluginService');
        throw error;
      }
    },

    async installPlugin(schoolId: string, userId: string, pluginId: string, config?: Record<string, unknown>) {
      try {
        logger.info('Installing plugin', { schoolId, userId, pluginId }, 'PluginService');
        const result = await repository.installPlugin(schoolId, pluginId, config);
        return result;
      } catch (error) {
        logger.error('Failed to install plugin', { schoolId, pluginId, error }, 'PluginService');
        throw error;
      }
    },

    async uninstallPlugin(schoolId: string, userId: string, pluginId: string) {
      try {
        logger.info('Uninstalling plugin', { schoolId, userId, pluginId }, 'PluginService');
        await repository.uninstallPlugin(schoolId, pluginId);
      } catch (error) {
        logger.error('Failed to uninstall plugin', { schoolId, pluginId, error }, 'PluginService');
        throw error;
      }
    },

    async enablePlugin(schoolId: string, userId: string, pluginId: string) {
      try {
        logger.info('Enabling plugin', { schoolId, userId, pluginId }, 'PluginService');
        const result = await repository.enablePlugin(schoolId, pluginId);
        return result;
      } catch (error) {
        logger.error('Failed to enable plugin', { schoolId, pluginId, error }, 'PluginService');
        throw error;
      }
    },

    async disablePlugin(schoolId: string, userId: string, pluginId: string) {
      try {
        logger.info('Disabling plugin', { schoolId, userId, pluginId }, 'PluginService');
        const result = await repository.disablePlugin(schoolId, pluginId);
        return result;
      } catch (error) {
        logger.error('Failed to disable plugin', { schoolId, pluginId, error }, 'PluginService');
        throw error;
      }
    },

    async updatePluginConfig(schoolId: string, userId: string, pluginId: string, config: Record<string, unknown>) {
      try {
        logger.info('Updating plugin config', { schoolId, userId, pluginId }, 'PluginService');
        const result = await repository.updatePluginConfig(schoolId, pluginId, config);
        return result;
      } catch (error) {
        logger.error('Failed to update plugin config', { schoolId, pluginId, error }, 'PluginService');
        throw error;
      }
    },

    async getInstalledPlugins(schoolId: string, userId: string) {
      try {
        logger.info('Getting installed plugins', { schoolId, userId }, 'PluginService');
        const result = await repository.getInstalledPlugins(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get installed plugins', { schoolId, error }, 'PluginService');
        throw error;
      }
    },
  };
}