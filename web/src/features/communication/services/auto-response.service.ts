import type { CommunicationRepositoryExtended, AutoResponse } from '@/features/communication/types';
import { logger } from '@educi/logger';

export function createAutoResponseService(repository: CommunicationRepositoryExtended) {
  return {
    async getAutoResponses(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching auto responses', { schoolId, userId }, 'AutoResponseService');

        const responses = await repository.getAutoResponses(schoolId, userId, filters);

        logger.info('Auto responses fetched', { schoolId, count: responses.length }, 'AutoResponseService');

        return responses;
      } catch (error) {
        logger.error('Failed to fetch auto responses', { schoolId }, 'AutoResponseService');
        throw error;
      }
    },

    async createAutoResponse(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.trigger) throw new Error('auto response trigger is required');
        if (!data.response) throw new Error('auto response content is required');

        logger.info('Creating auto response', { schoolId, userId, trigger: data.trigger }, 'AutoResponseService');

        const response = await repository.createAutoResponse({
          ...data,
          schoolId,
          createdBy: userId,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'auto_response.created', {
          responseId: response.id,
          userId,
        });

        logger.info('Auto response created', { responseId: response.id }, 'AutoResponseService');

        return response;
      } catch (error) {
        logger.error('Failed to create auto response', { schoolId }, 'AutoResponseService');
        throw error;
      }
    },

    async updateAutoResponse(responseId: string, userId: string, data: any) {
      try {
        if (!responseId) throw new Error('responseId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating auto response', { responseId, userId }, 'AutoResponseService');

        const updated = await repository.updateAutoResponse(responseId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        logger.info('Auto response updated', { responseId }, 'AutoResponseService');

        return updated;
      } catch (error) {
        logger.error('Failed to update auto response', { responseId }, 'AutoResponseService');
        throw error;
      }
    },

    async deleteAutoResponse(responseId: string, userId: string) {
      try {
        if (!responseId) throw new Error('responseId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting auto response', { responseId, userId }, 'AutoResponseService');

        await repository.deleteAutoResponse(responseId);

        logger.info('Auto response deleted', { responseId }, 'AutoResponseService');
      } catch (error) {
        logger.error('Failed to delete auto response', { responseId }, 'AutoResponseService');
        throw error;
      }
    },
  };
}
