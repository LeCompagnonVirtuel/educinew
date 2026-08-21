import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgAiKnowledgeBaseError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createAiKnowledgeBaseService(repository: EnterpriseIntegrationRepository) {
  return {
    async getKnowledgeBase(schoolId: string, userId: string, knowledgeBaseId: string) {
      try {
        logger.info('Getting knowledge base', { schoolId, userId, knowledgeBaseId }, 'AiKnowledgeBaseService');
        const result = await repository.getKnowledgeBase(schoolId, knowledgeBaseId);
        return result;
      } catch (error) {
        logger.error('Failed to get knowledge base', { schoolId, knowledgeBaseId, error }, 'AiKnowledgeBaseService');
        throw error;
      }
    },

    async listKnowledgeBases(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing knowledge bases', { schoolId, userId }, 'AiKnowledgeBaseService');
        const result = await repository.listKnowledgeBases(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list knowledge bases', { schoolId, error }, 'AiKnowledgeBaseService');
        throw error;
      }
    },

    async createKnowledgeBase(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating knowledge base', { schoolId, userId }, 'AiKnowledgeBaseService');
        const result = await repository.createKnowledgeBase(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create knowledge base', { schoolId, error }, 'AiKnowledgeBaseService');
        throw error;
      }
    },

    async updateKnowledgeBase(schoolId: string, userId: string, knowledgeBaseId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating knowledge base', { schoolId, userId, knowledgeBaseId }, 'AiKnowledgeBaseService');
        const result = await repository.updateKnowledgeBase(schoolId, knowledgeBaseId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update knowledge base', { schoolId, knowledgeBaseId, error }, 'AiKnowledgeBaseService');
        throw error;
      }
    },

    async deleteKnowledgeBase(schoolId: string, userId: string, knowledgeBaseId: string) {
      try {
        logger.info('Deleting knowledge base', { schoolId, userId, knowledgeBaseId }, 'AiKnowledgeBaseService');
        await repository.deleteKnowledgeBase(schoolId, knowledgeBaseId);
      } catch (error) {
        logger.error('Failed to delete knowledge base', { schoolId, knowledgeBaseId, error }, 'AiKnowledgeBaseService');
        throw error;
      }
    },

    async searchKnowledgeBase(schoolId: string, userId: string, knowledgeBaseId: string, query: string) {
      try {
        logger.info('Searching knowledge base', { schoolId, userId, knowledgeBaseId, query }, 'AiKnowledgeBaseService');
        const result = await repository.searchKnowledgeBase(schoolId, knowledgeBaseId, query);
        return result;
      } catch (error) {
        logger.error('Failed to search knowledge base', { schoolId, knowledgeBaseId, query, error }, 'AiKnowledgeBaseService');
        throw error;
      }
    },

    async indexKnowledgeBase(schoolId: string, userId: string, knowledgeBaseId: string) {
      try {
        logger.info('Indexing knowledge base', { schoolId, userId, knowledgeBaseId }, 'AiKnowledgeBaseService');
        const result = await repository.indexKnowledgeBase(schoolId, knowledgeBaseId);
        return result;
      } catch (error) {
        logger.error('Failed to index knowledge base', { schoolId, knowledgeBaseId, error }, 'AiKnowledgeBaseService');
        throw error;
      }
    },

    async getKnowledgeBaseStats(schoolId: string, userId: string, knowledgeBaseId: string) {
      try {
        logger.info('Getting knowledge base stats', { schoolId, userId, knowledgeBaseId }, 'AiKnowledgeBaseService');
        const result = await repository.getKnowledgeBaseStats(schoolId, knowledgeBaseId);
        return result;
      } catch (error) {
        logger.error('Failed to get knowledge base stats', { schoolId, knowledgeBaseId, error }, 'AiKnowledgeBaseService');
        throw error;
      }
    },
  };
}