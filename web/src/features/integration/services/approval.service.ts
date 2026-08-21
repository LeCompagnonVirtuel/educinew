import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgApprovalError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createApprovalService(repository: EnterpriseIntegrationRepository) {
  return {
    async listApprovals(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing approvals', { schoolId, userId }, 'ApprovalService');
        const result = await repository.listApprovals(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list approvals', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApproval(schoolId: string, userId: string, approvalId: string) {
      try {
        logger.info('Getting approval', { schoolId, userId, approvalId }, 'ApprovalService');
        const result = await repository.getApproval(schoolId, approvalId);
        return result;
      } catch (error) {
        logger.error('Failed to get approval', { schoolId, approvalId, error }, 'ApprovalService');
        throw error;
      }
    },

    async approveRequest(schoolId: string, userId: string, approvalId: string, comment?: string) {
      try {
        logger.info('Approving request', { schoolId, userId, approvalId }, 'ApprovalService');
        const result = await repository.approveRequest(schoolId, approvalId, comment);
        return result;
      } catch (error) {
        logger.error('Failed to approve request', { schoolId, approvalId, error }, 'ApprovalService');
        throw error;
      }
    },

    async rejectRequest(schoolId: string, userId: string, approvalId: string, reason: string) {
      try {
        logger.info('Rejecting request', { schoolId, userId, approvalId }, 'ApprovalService');
        const result = await repository.rejectRequest(schoolId, approvalId, reason);
        return result;
      } catch (error) {
        logger.error('Failed to reject request', { schoolId, approvalId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getPendingApprovals(schoolId: string, userId: string) {
      try {
        logger.info('Getting pending approvals', { schoolId, userId }, 'ApprovalService');
        const result = await repository.getPendingApprovals(schoolId);
        return result;
      } catch (error) {
        logger.error('Failed to get pending approvals', { schoolId, error }, 'ApprovalService');
        throw error;
      }
    },

    async getApprovalHistory(schoolId: string, userId: string, approvalId: string) {
      try {
        logger.info('Getting approval history', { schoolId, userId, approvalId }, 'ApprovalService');
        const result = await repository.getApprovalHistory(schoolId, approvalId);
        return result;
      } catch (error) {
        logger.error('Failed to get approval history', { schoolId, approvalId, error }, 'ApprovalService');
        throw error;
      }
    },
  };
}