import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgMarketplaceError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createMarketplaceService(repository: EnterpriseIntegrationRepository) {
  return {
    async getMarketplaceItem(schoolId: string, userId: string, itemId: string) {
      try {
        logger.info('Getting marketplace item', { schoolId, userId, itemId }, 'MarketplaceService');
        const result = await repository.getMarketplaceItem(schoolId, itemId);
        return result;
      } catch (error) {
        logger.error('Failed to get marketplace item', { schoolId, itemId, error }, 'MarketplaceService');
        throw error;
      }
    },

    async listMarketplaceItems(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing marketplace items', { schoolId, userId }, 'MarketplaceService');
        const result = await repository.listMarketplaceItems(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list marketplace items', { schoolId, error }, 'MarketplaceService');
        throw error;
      }
    },

    async createMarketplaceItem(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating marketplace item', { schoolId, userId }, 'MarketplaceService');
        const result = await repository.createMarketplaceItem(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create marketplace item', { schoolId, error }, 'MarketplaceService');
        throw error;
      }
    },

    async updateMarketplaceItem(schoolId: string, userId: string, itemId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating marketplace item', { schoolId, userId, itemId }, 'MarketplaceService');
        const result = await repository.updateMarketplaceItem(schoolId, itemId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update marketplace item', { schoolId, itemId, error }, 'MarketplaceService');
        throw error;
      }
    },

    async deleteMarketplaceItem(schoolId: string, userId: string, itemId: string) {
      try {
        logger.info('Deleting marketplace item', { schoolId, userId, itemId }, 'MarketplaceService');
        await repository.deleteMarketplaceItem(schoolId, itemId);
      } catch (error) {
        logger.error('Failed to delete marketplace item', { schoolId, itemId, error }, 'MarketplaceService');
        throw error;
      }
    },

    async searchMarketplace(schoolId: string, userId: string, query: string) {
      try {
        logger.info('Searching marketplace', { schoolId, userId, query }, 'MarketplaceService');
        const result = await repository.searchMarketplace(schoolId, query);
        return result;
      } catch (error) {
        logger.error('Failed to search marketplace', { schoolId, query, error }, 'MarketplaceService');
        throw error;
      }
    },

    async publishMarketplaceItem(schoolId: string, userId: string, itemId: string) {
      try {
        logger.info('Publishing marketplace item', { schoolId, userId, itemId }, 'MarketplaceService');
        const result = await repository.publishMarketplaceItem(schoolId, itemId);
        return result;
      } catch (error) {
        logger.error('Failed to publish marketplace item', { schoolId, itemId, error }, 'MarketplaceService');
        throw error;
      }
    },

    async unpublishMarketplaceItem(schoolId: string, userId: string, itemId: string) {
      try {
        logger.info('Unpublishing marketplace item', { schoolId, userId, itemId }, 'MarketplaceService');
        const result = await repository.unpublishMarketplaceItem(schoolId, itemId);
        return result;
      } catch (error) {
        logger.error('Failed to unpublish marketplace item', { schoolId, itemId, error }, 'MarketplaceService');
        throw error;
      }
    },

    async getMarketplaceStats(schoolId: string, userId: string) {
      try {
        logger.info('Getting marketplace stats', { schoolId, userId }, 'MarketplaceService');
        const result = await repository.getMarketplaceStats(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get marketplace stats', { schoolId, error }, 'MarketplaceService');
        throw error;
      }
    },
  };
}