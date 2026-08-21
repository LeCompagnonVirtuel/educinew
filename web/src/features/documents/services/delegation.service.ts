import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCreateError,
  DocUpdateError,
  DocDeleteError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createDelegationService(repository: DocumentRepositoryEnterprise) {
  return {
    async getDelegations(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching delegations', { schoolId, userId }, 'DelegationService');

        const permissions = await repository.getPermissionsByUser(schoolId, userId);

        logger.info('Delegations fetched', { schoolId, count: permissions.length }, 'DelegationService');

        return permissions;
      } catch (error) {
        logger.error('Failed to fetch delegations', { schoolId, error }, 'DelegationService');
        throw error;
      }
    },

    async getDelegation(delegationId: string, schoolId: string) {
      try {
        if (!delegationId) throw new DocValidationError('delegationId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching delegation', { delegationId, schoolId }, 'DelegationService');

        const permissions = await repository.getDefaultPermissions(schoolId);

        logger.info('Delegation fetched', { delegationId }, 'DelegationService');

        return permissions;
      } catch (error) {
        logger.error('Failed to fetch delegation', { delegationId, error }, 'DelegationService');
        throw error;
      }
    },

    async createDelegation(documentId: string, schoolId: string, fromUserId: string, toUserId: string, permission: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!fromUserId) throw new DocValidationError('fromUserId is required');
        if (!toUserId) throw new DocValidationError('toUserId is required');
        if (!permission) throw new DocValidationError('permission is required');

        logger.info('Creating delegation', { documentId, schoolId, fromUserId, toUserId }, 'DelegationService');

        const delegation = await repository.grantPermission(documentId, toUserId, permission, fromUserId);

        logger.info('Delegation created successfully', { documentId, toUserId }, 'DelegationService');

        return delegation;
      } catch (error) {
        logger.error('Failed to create delegation', { documentId, error }, 'DelegationService');
        throw error;
      }
    },

    async updateDelegation(documentId: string, userId: string, permission: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!permission) throw new DocValidationError('permission is required');

        logger.info('Updating delegation', { documentId, userId }, 'DelegationService');

        const delegation = await repository.updatePermission(documentId, userId, permission);

        logger.info('Delegation updated successfully', { documentId, userId }, 'DelegationService');

        return delegation;
      } catch (error) {
        logger.error('Failed to update delegation', { documentId, error }, 'DelegationService');
        throw error;
      }
    },

    async cancelDelegation(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Cancelling delegation', { documentId, userId }, 'DelegationService');

        await repository.revokePermission(documentId, userId);

        logger.info('Delegation cancelled successfully', { documentId, userId }, 'DelegationService');
      } catch (error) {
        logger.error('Failed to cancel delegation', { documentId, error }, 'DelegationService');
        throw error;
      }
    },

    async getActiveDelegations(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching active delegations', { schoolId, userId }, 'DelegationService');

        const permissions = await repository.getPermissionsByUser(schoolId, userId);

        logger.info('Active delegations fetched', { schoolId, count: permissions.length }, 'DelegationService');

        return permissions;
      } catch (error) {
        logger.error('Failed to fetch active delegations', { schoolId, error }, 'DelegationService');
        throw error;
      }
    },

    async getDelegationStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching delegation stats', { schoolId, userId }, 'DelegationService');

        const stats = await repository.getPermissionStats(schoolId);

        logger.info('Delegation stats fetched', { schoolId }, 'DelegationService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch delegation stats', { schoolId, error }, 'DelegationService');
        throw error;
      }
    },
  };
}
