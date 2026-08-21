import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgWorkflowError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createWorkflowService(repository: EnterpriseIntegrationRepository) {
  return {
    async getWorkflow(schoolId: string, userId: string, workflowId: string) {
      try {
        logger.info('Getting workflow', { schoolId, userId, workflowId }, 'WorkflowService');
        const result = await repository.getWorkflow(schoolId, workflowId);
        return result;
      } catch (error) {
        logger.error('Failed to get workflow', { schoolId, workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async listWorkflows(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing workflows', { schoolId, userId }, 'WorkflowService');
        const result = await repository.listWorkflows(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list workflows', { schoolId, error }, 'WorkflowService');
        throw error;
      }
    },

    async createWorkflow(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating workflow', { schoolId, userId }, 'WorkflowService');
        const result = await repository.createWorkflow(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create workflow', { schoolId, error }, 'WorkflowService');
        throw error;
      }
    },

    async updateWorkflow(schoolId: string, userId: string, workflowId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating workflow', { schoolId, userId, workflowId }, 'WorkflowService');
        const result = await repository.updateWorkflow(schoolId, workflowId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update workflow', { schoolId, workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async deleteWorkflow(schoolId: string, userId: string, workflowId: string) {
      try {
        logger.info('Deleting workflow', { schoolId, userId, workflowId }, 'WorkflowService');
        await repository.deleteWorkflow(schoolId, workflowId);
      } catch (error) {
        logger.error('Failed to delete workflow', { schoolId, workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async publishWorkflow(schoolId: string, userId: string, workflowId: string) {
      try {
        logger.info('Publishing workflow', { schoolId, userId, workflowId }, 'WorkflowService');
        const result = await repository.publishWorkflow(schoolId, workflowId);
        return result;
      } catch (error) {
        logger.error('Failed to publish workflow', { schoolId, workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async executeWorkflow(schoolId: string, userId: string, workflowId: string, params: Record<string, unknown>) {
      try {
        logger.info('Executing workflow', { schoolId, userId, workflowId }, 'WorkflowService');
        const result = await repository.executeWorkflow(schoolId, workflowId, params);
        return result;
      } catch (error) {
        logger.error('Failed to execute workflow', { schoolId, workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflowStatus(schoolId: string, userId: string, workflowId: string, executionId: string) {
      try {
        logger.info('Getting workflow status', { schoolId, userId, workflowId, executionId }, 'WorkflowService');
        const result = await repository.getWorkflowStatus(schoolId, workflowId, executionId);
        return result;
      } catch (error) {
        logger.error('Failed to get workflow status', { schoolId, workflowId, executionId, error }, 'WorkflowService');
        throw error;
      }
    },

    async cancelWorkflow(schoolId: string, userId: string, workflowId: string, executionId: string) {
      try {
        logger.info('Cancelling workflow', { schoolId, userId, workflowId, executionId }, 'WorkflowService');
        const result = await repository.cancelWorkflow(schoolId, workflowId, executionId);
        return result;
      } catch (error) {
        logger.error('Failed to cancel workflow', { schoolId, workflowId, executionId, error }, 'WorkflowService');
        throw error;
      }
    },
  };
}