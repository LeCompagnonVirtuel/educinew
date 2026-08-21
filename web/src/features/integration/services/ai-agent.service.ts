import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgAiAgentError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createAiAgentService(repository: EnterpriseIntegrationRepository) {
  return {
    async getAiAgent(schoolId: string, userId: string, agentId: string) {
      try {
        logger.info('Getting AI agent', { schoolId, userId, agentId }, 'AiAgentService');
        const result = await repository.getAiAgent(schoolId, agentId);
        return result;
      } catch (error) {
        logger.error('Failed to get AI agent', { schoolId, agentId, error }, 'AiAgentService');
        throw error;
      }
    },

    async listAiAgents(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing AI agents', { schoolId, userId }, 'AiAgentService');
        const result = await repository.listAiAgents(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list AI agents', { schoolId, error }, 'AiAgentService');
        throw error;
      }
    },

    async createAiAgent(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating AI agent', { schoolId, userId }, 'AiAgentService');
        const result = await repository.createAiAgent(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create AI agent', { schoolId, error }, 'AiAgentService');
        throw error;
      }
    },

    async updateAiAgent(schoolId: string, userId: string, agentId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating AI agent', { schoolId, userId, agentId }, 'AiAgentService');
        const result = await repository.updateAiAgent(schoolId, agentId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update AI agent', { schoolId, agentId, error }, 'AiAgentService');
        throw error;
      }
    },

    async deleteAiAgent(schoolId: string, userId: string, agentId: string) {
      try {
        logger.info('Deleting AI agent', { schoolId, userId, agentId }, 'AiAgentService');
        await repository.deleteAiAgent(schoolId, agentId);
      } catch (error) {
        logger.error('Failed to delete AI agent', { schoolId, agentId, error }, 'AiAgentService');
        throw error;
      }
    },

    async executeAiAgent(schoolId: string, userId: string, agentId: string, params: Record<string, unknown>) {
      try {
        logger.info('Executing AI agent', { schoolId, userId, agentId }, 'AiAgentService');
        const result = await repository.executeAiAgent(schoolId, agentId, params);
        return result;
      } catch (error) {
        logger.error('Failed to execute AI agent', { schoolId, agentId, error }, 'AiAgentService');
        throw error;
      }
    },

    async getAiAgentStatus(schoolId: string, userId: string, agentId: string, executionId: string) {
      try {
        logger.info('Getting AI agent status', { schoolId, userId, agentId, executionId }, 'AiAgentService');
        const result = await repository.getAiAgentStatus(schoolId, agentId, executionId);
        return result;
      } catch (error) {
        logger.error('Failed to get AI agent status', { schoolId, agentId, executionId, error }, 'AiAgentService');
        throw error;
      }
    },

    async getAiAgentStats(schoolId: string, userId: string, agentId: string) {
      try {
        logger.info('Getting AI agent stats', { schoolId, userId, agentId }, 'AiAgentService');
        const result = await repository.getAiAgentStats(schoolId, agentId);
        return result;
      } catch (error) {
        logger.error('Failed to get AI agent stats', { schoolId, agentId, error }, 'AiAgentService');
        throw error;
      }
    },
  };
}