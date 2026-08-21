import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocWorkflowNotFoundError,
  DocWorkflowCreateError,
  DocWorkflowUpdateError,
  DocWorkflowDeleteError,
  DocWorkflowNotCompletedError,
  DocWorkflowCircularError,
  DocWorkflowConditionError,
  DocWorkflowTriggerError,
  DocWorkflowTimeoutError,
  DocWorkflowStateError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createWorkflowService(repository: DocumentRepositoryEnterprise) {
  return {
    async createWorkflow(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('workflow name is required');

        logger.info('Creating workflow', { schoolId, userId, name: data.name }, 'WorkflowService');

        const workflow = await repository.createWorkflow(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Workflow created successfully', { workflowId: workflow.id }, 'WorkflowService');

        return workflow;
      } catch (error) {
        logger.error('Failed to create workflow', { schoolId, error }, 'WorkflowService');
        throw error;
      }
    },

    async updateWorkflow(workflowId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating workflow', { workflowId, userId }, 'WorkflowService');

        const existing = await repository.getWorkflow(workflowId);
        if (!existing) throw new DocWorkflowNotFoundError(workflowId);

        const updated = await repository.updateWorkflow(workflowId, data as any);

        logger.info('Workflow updated successfully', { workflowId }, 'WorkflowService');

        return updated;
      } catch (error) {
        logger.error('Failed to update workflow', { workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async deleteWorkflow(workflowId: string, userId: string) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting workflow', { workflowId, userId }, 'WorkflowService');

        const existing = await repository.getWorkflow(workflowId);
        if (!existing) throw new DocWorkflowNotFoundError(workflowId);

        await repository.deleteWorkflow(workflowId);

        logger.info('Workflow deleted successfully', { workflowId }, 'WorkflowService');
      } catch (error) {
        logger.error('Failed to delete workflow', { workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async triggerWorkflow(workflowId: string, documentId: string, userId: string) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Triggering workflow', { workflowId, documentId, userId }, 'WorkflowService');

        const existing = await repository.getWorkflow(workflowId);
        if (!existing) throw new DocWorkflowNotFoundError(workflowId);

        const triggered = await repository.triggerWorkflow(workflowId, documentId, userId);

        logger.info('Workflow triggered successfully', { workflowId, documentId }, 'WorkflowService');

        return triggered;
      } catch (error) {
        logger.error('Failed to trigger workflow', { workflowId, documentId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflowHistory(workflowId: string, userId: string) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workflow history', { workflowId, userId }, 'WorkflowService');

        const history = await repository.getWorkflowHistory(workflowId);

        logger.info('Workflow history fetched', { workflowId, count: history.length }, 'WorkflowService');

        return history;
      } catch (error) {
        logger.error('Failed to fetch workflow history', { workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflowSteps(workflowId: string, userId: string) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workflow steps', { workflowId, userId }, 'WorkflowService');

        const steps = await repository.getWorkflowSteps(workflowId);

        logger.info('Workflow steps fetched', { workflowId, count: steps.length }, 'WorkflowService');

        return steps;
      } catch (error) {
        logger.error('Failed to fetch workflow steps', { workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflowConditions(workflowId: string, userId: string) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workflow conditions', { workflowId, userId }, 'WorkflowService');

        const conditions = await repository.getWorkflowConditions(workflowId);

        logger.info('Workflow conditions fetched', { workflowId, count: conditions.length }, 'WorkflowService');

        return conditions;
      } catch (error) {
        logger.error('Failed to fetch workflow conditions', { workflowId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflowStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workflow stats', { schoolId, userId }, 'WorkflowService');

        const stats = await repository.getWorkflowStats(schoolId, dateFrom, dateTo);

        logger.info('Workflow stats fetched', { schoolId }, 'WorkflowService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch workflow stats', { schoolId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getActiveWorkflows(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching active workflows', { schoolId, userId }, 'WorkflowService');

        const workflows = await repository.getActiveWorkflows(schoolId);

        logger.info('Active workflows fetched', { schoolId, count: workflows.length }, 'WorkflowService');

        return workflows;
      } catch (error) {
        logger.error('Failed to fetch active workflows', { schoolId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflowByDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workflow by document', { documentId, userId }, 'WorkflowService');

        const workflows = await repository.getWorkflowByDocument(documentId);

        logger.info('Workflow by document fetched', { documentId, count: workflows.length }, 'WorkflowService');

        return workflows;
      } catch (error) {
        logger.error('Failed to fetch workflow by document', { documentId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflowTemplates(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workflow templates', { schoolId, userId }, 'WorkflowService');

        const templates = await repository.getWorkflowTemplates(schoolId);

        logger.info('Workflow templates fetched', { schoolId, count: templates.length }, 'WorkflowService');

        return templates;
      } catch (error) {
        logger.error('Failed to fetch workflow templates', { schoolId, error }, 'WorkflowService');
        throw error;
      }
    },

    async createWorkflowTemplate(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('template name is required');

        logger.info('Creating workflow template', { schoolId, userId, name: data.name }, 'WorkflowService');

        const template = await repository.createWorkflowTemplate(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Workflow template created successfully', { templateId: template.id }, 'WorkflowService');

        return template;
      } catch (error) {
        logger.error('Failed to create workflow template', { schoolId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflowTimeouts(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workflow timeouts', { schoolId, userId }, 'WorkflowService');

        const timeouts = await repository.getWorkflowTimeouts(schoolId);

        logger.info('Workflow timeouts fetched', { schoolId, count: timeouts.length }, 'WorkflowService');

        return timeouts;
      } catch (error) {
        logger.error('Failed to fetch workflow timeouts', { schoolId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflows(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workflows', { schoolId, userId }, 'WorkflowService');

        const workflows = await repository.getWorkflows(schoolId);

        logger.info('Workflows fetched successfully', { schoolId, count: workflows.length }, 'WorkflowService');

        return workflows;
      } catch (error) {
        logger.error('Failed to fetch workflows', { schoolId, error }, 'WorkflowService');
        throw error;
      }
    },

    async getWorkflow(workflowId: string, userId: string) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workflow', { workflowId, userId }, 'WorkflowService');

        const workflow = await repository.getWorkflow(workflowId);
        if (!workflow) throw new DocWorkflowNotFoundError(workflowId);

        return workflow;
      } catch (error) {
        logger.error('Failed to fetch workflow', { workflowId, error }, 'WorkflowService');
        throw error;
      }
    },
  };
}
