import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgTopicError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createTopicService(repository: EnterpriseIntegrationRepository) {
  return {
    async getTopic(schoolId: string, userId: string, topicId: string) {
      try {
        logger.info('Getting topic', { schoolId, userId, topicId }, 'TopicService');
        const result = await repository.getTopic(schoolId, topicId);
        return result;
      } catch (error) {
        logger.error('Failed to get topic', { schoolId, topicId, error }, 'TopicService');
        throw error;
      }
    },

    async listTopics(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing topics', { schoolId, userId }, 'TopicService');
        const result = await repository.listTopics(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list topics', { schoolId, error }, 'TopicService');
        throw error;
      }
    },

    async createTopic(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating topic', { schoolId, userId }, 'TopicService');
        const result = await repository.createTopic(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create topic', { schoolId, error }, 'TopicService');
        throw error;
      }
    },

    async updateTopic(schoolId: string, userId: string, topicId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating topic', { schoolId, userId, topicId }, 'TopicService');
        const result = await repository.updateTopic(schoolId, topicId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update topic', { schoolId, topicId, error }, 'TopicService');
        throw error;
      }
    },

    async deleteTopic(schoolId: string, userId: string, topicId: string) {
      try {
        logger.info('Deleting topic', { schoolId, userId, topicId }, 'TopicService');
        await repository.deleteTopic(schoolId, topicId);
      } catch (error) {
        logger.error('Failed to delete topic', { schoolId, topicId, error }, 'TopicService');
        throw error;
      }
    },

    async getTopicStats(schoolId: string, userId: string, topicId: string) {
      try {
        logger.info('Getting topic stats', { schoolId, userId, topicId }, 'TopicService');
        const result = await repository.getTopicStats(schoolId, topicId);
        return result;
      } catch (error) {
        logger.error('Failed to get topic stats', { schoolId, topicId, error }, 'TopicService');
        throw error;
      }
    },
  };
}