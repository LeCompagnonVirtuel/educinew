import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgAiAssistantError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createAiAssistantService(repository: EnterpriseIntegrationRepository) {
  return {
    async getAiAssistant(schoolId: string, userId: string, assistantId: string) {
      try {
        logger.info('Getting AI assistant', { schoolId, userId, assistantId }, 'AiAssistantService');
        const result = await repository.getAiAssistant(schoolId, assistantId);
        return result;
      } catch (error) {
        logger.error('Failed to get AI assistant', { schoolId, assistantId, error }, 'AiAssistantService');
        throw error;
      }
    },

    async listAiAssistants(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing AI assistants', { schoolId, userId }, 'AiAssistantService');
        const result = await repository.listAiAssistants(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list AI assistants', { schoolId, error }, 'AiAssistantService');
        throw error;
      }
    },

    async createAiAssistant(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating AI assistant', { schoolId, userId }, 'AiAssistantService');
        const result = await repository.createAiAssistant(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create AI assistant', { schoolId, error }, 'AiAssistantService');
        throw error;
      }
    },

    async updateAiAssistant(schoolId: string, userId: string, assistantId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating AI assistant', { schoolId, userId, assistantId }, 'AiAssistantService');
        const result = await repository.updateAiAssistant(schoolId, assistantId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update AI assistant', { schoolId, assistantId, error }, 'AiAssistantService');
        throw error;
      }
    },

    async deleteAiAssistant(schoolId: string, userId: string, assistantId: string) {
      try {
        logger.info('Deleting AI assistant', { schoolId, userId, assistantId }, 'AiAssistantService');
        await repository.deleteAiAssistant(schoolId, assistantId);
      } catch (error) {
        logger.error('Failed to delete AI assistant', { schoolId, assistantId, error }, 'AiAssistantService');
        throw error;
      }
    },

    async chatWithAssistant(schoolId: string, userId: string, assistantId: string, message: string) {
      try {
        logger.info('Chatting with AI assistant', { schoolId, userId, assistantId }, 'AiAssistantService');
        const result = await repository.chatWithAssistant(schoolId, assistantId, message);
        return result;
      } catch (error) {
        logger.error('Failed to chat with AI assistant', { schoolId, assistantId, error }, 'AiAssistantService');
        throw error;
      }
    },

    async getAssistantHistory(schoolId: string, userId: string, assistantId: string) {
      try {
        logger.info('Getting assistant history', { schoolId, userId, assistantId }, 'AiAssistantService');
        const result = await repository.getAssistantHistory(schoolId, assistantId);
        return result;
      } catch (error) {
        logger.error('Failed to get assistant history', { schoolId, assistantId, error }, 'AiAssistantService');
        throw error;
      }
    },

    async clearAssistantHistory(schoolId: string, userId: string, assistantId: string) {
      try {
        logger.info('Clearing assistant history', { schoolId, userId, assistantId }, 'AiAssistantService');
        await repository.clearAssistantHistory(schoolId, assistantId);
      } catch (error) {
        logger.error('Failed to clear assistant history', { schoolId, assistantId, error }, 'AiAssistantService');
        throw error;
      }
    },

    async getAssistantStats(schoolId: string, userId: string, assistantId: string) {
      try {
        logger.info('Getting assistant stats', { schoolId, userId, assistantId }, 'AiAssistantService');
        const result = await repository.getAssistantStats(schoolId, assistantId);
        return result;
      } catch (error) {
        logger.error('Failed to get assistant stats', { schoolId, assistantId, error }, 'AiAssistantService');
        throw error;
      }
    },
  };
}