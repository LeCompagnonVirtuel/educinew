import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocApprovalNotFoundError,
  DocApprovalCreateError,
  DocApprovalTimeoutError,
  DocApprovalRejectedError,
  DocApprovalAlreadyApprovedError,
  DocApprovalStepError,
  DocApprovalCircularError,
  DocApprovalDelegationError,
  DocApprovalEscalationError,
  DocApprovalConditionError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createApprovalService(repository: DocumentRepositoryEnterprise) {
  return {
    async createApprovalWorkflow(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('workflow name is required');

        logger.info('Creating approval workflow', { schoolId, userId, name: data.name }, 'ApprovalService');

        const workflow = await repository.createApprovalWorkflow(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Approval workflow created successfully', { workflowId: workflow.id }, 'ApprovalService');

        return workflow;
      } catch (error) {
        logger.error('Failed to create approval workflow', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async updateApprovalWorkflow(workflowId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating approval workflow', { workflowId, userId }, 'ApprovalService');

        const existing = await repository.getApproval(workflowId);
        if (!existing) throw new DocApprovalNotFoundError(workflowId);

        const updated = await repository.updateApprovalWorkflow(workflowId, data as any);

        logger.info('Approval workflow updated successfully', { workflowId }, 'ApprovalService');

        return updated;
      } catch (error) {
        logger.error('Failed to update approval workflow', { workflowId, error }, 'ApprovalService');
        throw error;
      }
    },

    async deleteApprovalWorkflow(workflowId: string, userId: string) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting approval workflow', { workflowId, userId }, 'ApprovalService');

        const existing = await repository.getApproval(workflowId);
        if (!existing) throw new DocApprovalNotFoundError(workflowId);

        await repository.deleteApprovalWorkflow(workflowId);

        logger.info('Approval workflow deleted successfully', { workflowId }, 'ApprovalService');
      } catch (error) {
        logger.error('Failed to delete approval workflow', { workflowId, error }, 'ApprovalService');
        throw error;
      }
    },

    async approveStep(stepId: string, approverId: string, comment?: string) {
      try {
        if (!stepId) throw new DocValidationError('stepId is required');
        if (!approverId) throw new DocValidationError('approverId is required');

        logger.info('Approving step', { stepId, approverId }, 'ApprovalService');

        const approved = await repository.approveStep(stepId, approverId, comment);

        logger.info('Step approved successfully', { stepId }, 'ApprovalService');

        return approved;
      } catch (error) {
        logger.error('Failed to approve step', { stepId, error }, 'ApprovalService');
        throw error;
      }
    },

    async rejectStep(stepId: string, approverId: string, reason?: string) {
      try {
        if (!stepId) throw new DocValidationError('stepId is required');
        if (!approverId) throw new DocValidationError('approverId is required');

        logger.info('Rejecting step', { stepId, approverId }, 'ApprovalService');

        const rejected = await repository.rejectStep(stepId, approverId, reason);

        logger.info('Step rejected successfully', { stepId }, 'ApprovalService');

        return rejected;
      } catch (error) {
        logger.error('Failed to reject step', { stepId, error }, 'ApprovalService');
        throw error;
      }
    },

    async delegateStep(stepId: string, fromUserId: string, toUserId: string) {
      try {
        if (!stepId) throw new DocValidationError('stepId is required');
        if (!fromUserId) throw new DocValidationError('fromUserId is required');
        if (!toUserId) throw new DocValidationError('toUserId is required');

        logger.info('Delegating step', { stepId, fromUserId, toUserId }, 'ApprovalService');

        const delegated = await repository.delegateStep(stepId, fromUserId, toUserId);

        logger.info('Step delegated successfully', { stepId, toUserId }, 'ApprovalService');

        return delegated;
      } catch (error) {
        logger.error('Failed to delegate step', { stepId, error }, 'ApprovalService');
        throw error;
      }
    },

    async escalateStep(stepId: string, escalatedBy: string) {
      try {
        if (!stepId) throw new DocValidationError('stepId is required');
        if (!escalatedBy) throw new DocValidationError('escalatedBy is required');

        logger.info('Escalating step', { stepId, escalatedBy }, 'ApprovalService');

        const escalated = await repository.escalateStep(stepId, escalatedBy);

        logger.info('Step escalated successfully', { stepId }, 'ApprovalService');

        return escalated;
      } catch (error) {
        logger.error('Failed to escalate step', { stepId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApprovalHistory(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching approval history', { documentId, userId }, 'ApprovalService');

        const history = await repository.getApprovalHistory(documentId);

        logger.info('Approval history fetched', { documentId, count: history.length }, 'ApprovalService');

        return history;
      } catch (error) {
        logger.error('Failed to fetch approval history', { documentId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getPendingApprovals(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching pending approvals', { schoolId, userId }, 'ApprovalService');

        const approvals = await repository.getPendingApprovals(schoolId);

        logger.info('Pending approvals fetched', { schoolId, count: approvals.length }, 'ApprovalService');

        return approvals;
      } catch (error) {
        logger.error('Failed to fetch pending approvals', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getCompletedApprovals(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching completed approvals', { schoolId, userId }, 'ApprovalService');

        const approvals = await repository.getCompletedApprovals(schoolId);

        logger.info('Completed approvals fetched', { schoolId, count: approvals.length }, 'ApprovalService');

        return approvals;
      } catch (error) {
        logger.error('Failed to fetch completed approvals', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApprovalStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching approval stats', { schoolId, userId }, 'ApprovalService');

        const stats = await repository.getWorkflowStats(schoolId, dateFrom, dateTo);

        logger.info('Approval stats fetched', { schoolId }, 'ApprovalService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch approval stats', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApprovalTimeline(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching approval timeline', { documentId, userId }, 'ApprovalService');

        const timeline = await repository.getApprovalTimeline(documentId);

        logger.info('Approval timeline fetched', { documentId, count: timeline.length }, 'ApprovalService');

        return timeline;
      } catch (error) {
        logger.error('Failed to fetch approval timeline', { documentId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApprovalByDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching approval by document', { documentId, userId }, 'ApprovalService');

        const approvals = await repository.getApprovalByDocument(documentId);

        logger.info('Approval by document fetched', { documentId, count: approvals.length }, 'ApprovalService');

        return approvals;
      } catch (error) {
        logger.error('Failed to fetch approval by document', { documentId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApprovalByUser(schoolId: string, userId: string, targetUserId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!targetUserId) throw new DocValidationError('targetUserId is required');

        logger.info('Fetching approval by user', { schoolId, userId, targetUserId }, 'ApprovalService');

        const approvals = await repository.getApprovalByUser(schoolId, targetUserId);

        logger.info('Approval by user fetched', { schoolId, count: approvals.length }, 'ApprovalService');

        return approvals;
      } catch (error) {
        logger.error('Failed to fetch approval by user', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApprovalTemplates(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching approval templates', { schoolId, userId }, 'ApprovalService');

        const templates = await repository.getApprovalTemplates(schoolId);

        logger.info('Approval templates fetched', { schoolId, count: templates.length }, 'ApprovalService');

        return templates;
      } catch (error) {
        logger.error('Failed to fetch approval templates', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async createApprovalTemplate(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('template name is required');

        logger.info('Creating approval template', { schoolId, userId, name: data.name }, 'ApprovalService');

        const template = await repository.createApprovalTemplate(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Approval template created successfully', { templateId: template.id }, 'ApprovalService');

        return template;
      } catch (error) {
        logger.error('Failed to create approval template', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async updateApprovalTemplate(templateId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating approval template', { templateId, userId }, 'ApprovalService');

        const updated = await repository.updateApprovalTemplate(templateId, data as any);

        logger.info('Approval template updated successfully', { templateId }, 'ApprovalService');

        return updated;
      } catch (error) {
        logger.error('Failed to update approval template', { templateId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApprovalConditions(workflowId: string, userId: string) {
      try {
        if (!workflowId) throw new DocValidationError('workflowId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching approval conditions', { workflowId, userId }, 'ApprovalService');

        const conditions = await repository.getApprovalConditions(workflowId);

        logger.info('Approval conditions fetched', { workflowId, count: conditions.length }, 'ApprovalService');

        return conditions;
      } catch (error) {
        logger.error('Failed to fetch approval conditions', { workflowId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApprovals(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching approvals', { schoolId, userId }, 'ApprovalService');

        const approvals = await repository.getApprovals(schoolId);

        logger.info('Approvals fetched successfully', { schoolId, count: approvals.length }, 'ApprovalService');

        return approvals;
      } catch (error) {
        logger.error('Failed to fetch approvals', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApproval(approvalId: string, userId: string) {
      try {
        if (!approvalId) throw new DocValidationError('approvalId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching approval', { approvalId, userId }, 'ApprovalService');

        const approval = await repository.getApproval(approvalId);
        if (!approval) throw new DocApprovalNotFoundError(approvalId);

        return approval;
      } catch (error) {
        logger.error('Failed to fetch approval', { approvalId, error }, 'ApprovalService');
        throw error;
      }
    },
  };
}
