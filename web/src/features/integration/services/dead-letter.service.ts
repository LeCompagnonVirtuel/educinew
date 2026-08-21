import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgDeadLetterError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createDeadLetterService(repository: EnterpriseIntegrationRepository) {
  return {
    async listDeadLetters(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing dead letters', { schoolId, userId }, 'DeadLetterService');
        const result = await repository.listDeadLetters(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list dead letters', { schoolId, error }, 'DeadLetterService');
        throw error;
      }
    },

    async getDeadLetter(schoolId: string, userId: string, deadLetterId: string) {
      try {
        logger.info('Getting dead letter', { schoolId, userId, deadLetterId }, 'DeadLetterService');
        const result = await repository.getDeadLetter(schoolId, deadLetterId);
        return result;
      } catch (error) {
        logger.error('Failed to get dead letter', { schoolId, deadLetterId, error }, 'DeadLetterService');
        throw error;
      }
    },

    async retryDeadLetter(schoolId: string, userId: string, deadLetterId: string) {
      try {
        logger.info('Retrying dead letter', { schoolId, userId, deadLetterId }, 'DeadLetterService');
        const result = await repository.retryDeadLetter(schoolId, deadLetterId);
        return result;
      } catch (error) {
        logger.error('Failed to retry dead letter', { schoolId, deadLetterId, error }, 'DeadLetterService');
        throw error;
      }
    },

    async retryAllDeadLetters(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Retrying all dead letters', { schoolId, userId }, 'DeadLetterService');
        const result = await repository.retryAllDeadLetters(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to retry all dead letters', { schoolId, error }, 'DeadLetterService');
        throw error;
      }
    },

    async purgeDeadLetters(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Purging dead letters', { schoolId, userId }, 'DeadLetterService');
        await repository.purgeDeadLetters(schoolId, filters);
      } catch (error) {
        logger.error('Failed to purge dead letters', { schoolId, error }, 'DeadLetterService');
        throw error;
      }
    },

    async getDeadLetterStats(schoolId: string, userId: string) {
      try {
        logger.info('Getting dead letter stats', { schoolId, userId }, 'DeadLetterService');
        const result = await repository.getDeadLetterStats(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get dead letter stats', { schoolId, error }, 'DeadLetterService');
        throw error;
      }
    },
  };
}