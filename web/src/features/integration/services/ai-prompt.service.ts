import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgAiPromptError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createAiPromptService(repository: EnterpriseIntegrationRepository) {
  return {
    async getAiPrompt(schoolId: string, userId: string, promptId: string) {
      try {
        logger.info('Getting AI prompt', { schoolId, userId, promptId }, 'AiPromptService');
        const result = await repository.getAiPrompt(schoolId, promptId);
        return result;
      } catch (error) {
        logger.error('Failed to get AI prompt', { schoolId, promptId, error }, 'AiPromptService');
        throw error;
      }
    },

    async listAiPrompts(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing AI prompts', { schoolId, userId }, 'AiPromptService');
        const result = await repository.listAiPrompts(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list AI prompts', { schoolId, error }, 'AiPromptService');
        throw error;
      }
    },

    async createAiPrompt(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating AI prompt', { schoolId, userId }, 'AiPromptService');
        const result = await repository.createAiPrompt(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create AI prompt', { schoolId, error }, 'AiPromptService');
        throw error;
      }
    },

    async updateAiPrompt(schoolId: string, userId: string, promptId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating AI prompt', { schoolId, userId, promptId }, 'AiPromptService');
        const result = await repository.updateAiPrompt(schoolId, promptId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update AI prompt', { schoolId, promptId, error }, 'AiPromptService');
        throw error;
      }
    },

    async deleteAiPrompt(schoolId: string, userId: string, promptId: string) {
      try {
        logger.info('Deleting AI prompt', { schoolId, userId, promptId }, 'AiPromptService');
        await repository.deleteAiPrompt(schoolId, promptId);
      } catch (error) {
        logger.error('Failed to delete AI prompt', { schoolId, promptId, error }, 'AiPromptService');
        throw error;
      }
    },

    async executeAiPrompt(schoolId: string, userId: string, promptId: string, params: Record<string, unknown>) {
      try {
        logger.info('Executing AI prompt', { schoolId, userId, promptId }, 'AiPromptService');
        const result = await repository.executeAiPrompt(schoolId, promptId, params);
        return result;
      } catch (error) {
        logger.error('Failed to execute AI prompt', { schoolId, promptId, error }, 'AiPromptService');
        throw error;
      }
    },

    async getAiPromptStats(schoolId: string, userId: string, promptId: string) {
      try {
        logger.info('Getting AI prompt stats', { schoolId, userId, promptId }, 'AiPromptService');
        const result = await repository.getAiPromptStats(schoolId, promptId);
        return result;
      } catch (error) {
        logger.error('Failed to get AI prompt stats', { schoolId, promptId, error }, 'AiPromptService');
        throw error;
      }
    },

    async duplicateAiPrompt(schoolId: string, userId: string, promptId: string) {
      try {
        logger.info('Duplicating AI prompt', { schoolId, userId, promptId }, 'AiPromptService');
        const result = await repository.duplicateAiPrompt(schoolId, promptId);
        return result;
      } catch (error) {
        logger.error('Failed to duplicate AI prompt', { schoolId, promptId, error }, 'AiPromptService');
        throw error;
      }
    },
  };
}