import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgAutomationError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createAutomationService(repository: EnterpriseIntegrationRepository) {
  return {
    async getAutomation(schoolId: string, userId: string, automationId: string) {
      try {
        logger.info('Getting automation', { schoolId, userId, automationId }, 'AutomationService');
        const result = await repository.getAutomation(schoolId, automationId);
        return result;
      } catch (error) {
        logger.error('Failed to get automation', { schoolId, automationId, error }, 'AutomationService');
        throw error;
      }
    },

    async listAutomations(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing automations', { schoolId, userId }, 'AutomationService');
        const result = await repository.listAutomations(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list automations', { schoolId, error }, 'AutomationService');
        throw error;
      }
    },

    async createAutomation(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating automation', { schoolId, userId }, 'AutomationService');
        const result = await repository.createAutomation(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create automation', { schoolId, error }, 'AutomationService');
        throw error;
      }
    },

    async updateAutomation(schoolId: string, userId: string, automationId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating automation', { schoolId, userId, automationId }, 'AutomationService');
        const result = await repository.updateAutomation(schoolId, automationId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update automation', { schoolId, automationId, error }, 'AutomationService');
        throw error;
      }
    },

    async deleteAutomation(schoolId: string, userId: string, automationId: string) {
      try {
        logger.info('Deleting automation', { schoolId, userId, automationId }, 'AutomationService');
        await repository.deleteAutomation(schoolId, automationId);
      } catch (error) {
        logger.error('Failed to delete automation', { schoolId, automationId, error }, 'AutomationService');
        throw error;
      }
    },

    async executeAutomation(schoolId: string, userId: string, automationId: string, params: Record<string, unknown>) {
      try {
        logger.info('Executing automation', { schoolId, userId, automationId }, 'AutomationService');
        const result = await repository.executeAutomation(schoolId, automationId, params);
        return result;
      } catch (error) {
        logger.error('Failed to execute automation', { schoolId, automationId, error }, 'AutomationService');
        throw error;
      }
    },

    async scheduleAutomation(schoolId: string, userId: string, automationId: string, schedule: Record<string, unknown>) {
      try {
        logger.info('Scheduling automation', { schoolId, userId, automationId }, 'AutomationService');
        const result = await repository.scheduleAutomation(schoolId, automationId, schedule);
        return result;
      } catch (error) {
        logger.error('Failed to schedule automation', { schoolId, automationId, error }, 'AutomationService');
        throw error;
      }
    },

    async pauseAutomation(schoolId: string, userId: string, automationId: string) {
      try {
        logger.info('Pausing automation', { schoolId, userId, automationId }, 'AutomationService');
        const result = await repository.pauseAutomation(schoolId, automationId);
        return result;
      } catch (error) {
        logger.error('Failed to pause automation', { schoolId, automationId, error }, 'AutomationService');
        throw error;
      }
    },

    async resumeAutomation(schoolId: string, userId: string, automationId: string) {
      try {
        logger.info('Resuming automation', { schoolId, userId, automationId }, 'AutomationService');
        const result = await repository.resumeAutomation(schoolId, automationId);
        return result;
      } catch (error) {
        logger.error('Failed to resume automation', { schoolId, automationId, error }, 'AutomationService');
        throw error;
      }
    },
  };
}