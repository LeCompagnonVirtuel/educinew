import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgAiModelError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createAiModelService(repository: EnterpriseIntegrationRepository) {
  return {
    async getAiModel(schoolId: string, userId: string, modelId: string) {
      try {
        logger.info('Getting AI model', { schoolId, userId, modelId }, 'AiModelService');
        const result = await repository.getAiModel(schoolId, modelId);
        return result;
      } catch (error) {
        logger.error('Failed to get AI model', { schoolId, modelId, error }, 'AiModelService');
        throw error;
      }
    },

    async listAiModels(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing AI models', { schoolId, userId }, 'AiModelService');
        const result = await repository.listAiModels(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list AI models', { schoolId, error }, 'AiModelService');
        throw error;
      }
    },

    async createAiModel(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating AI model', { schoolId, userId }, 'AiModelService');
        const result = await repository.createAiModel(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create AI model', { schoolId, error }, 'AiModelService');
        throw error;
      }
    },

    async updateAiModel(schoolId: string, userId: string, modelId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating AI model', { schoolId, userId, modelId }, 'AiModelService');
        const result = await repository.updateAiModel(schoolId, modelId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update AI model', { schoolId, modelId, error }, 'AiModelService');
        throw error;
      }
    },

    async deleteAiModel(schoolId: string, userId: string, modelId: string) {
      try {
        logger.info('Deleting AI model', { schoolId, userId, modelId }, 'AiModelService');
        await repository.deleteAiModel(schoolId, modelId);
      } catch (error) {
        logger.error('Failed to delete AI model', { schoolId, modelId, error }, 'AiModelService');
        throw error;
      }
    },

    async getAiModelStats(schoolId: string, userId: string, modelId: string) {
      try {
        logger.info('Getting AI model stats', { schoolId, userId, modelId }, 'AiModelService');
        const result = await repository.getAiModelStats(schoolId, modelId);
        return result;
      } catch (error) {
        logger.error('Failed to get AI model stats', { schoolId, modelId, error }, 'AiModelService');
        throw error;
      }
    },
  };
}