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

export function createComplianceService(repository: DocumentRepositoryEnterprise) {
  return {
    async getComplianceChecks(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching compliance checks', { schoolId, userId }, 'ComplianceService');

        const checks = await repository.getComplianceChecks(schoolId);

        logger.info('Compliance checks fetched', { schoolId, count: checks.length }, 'ComplianceService');

        return checks;
      } catch (error) {
        logger.error('Failed to fetch compliance checks', { schoolId, error }, 'ComplianceService');
        throw error;
      }
    },

    async runComplianceCheck(documentId: string, userId: string, options?: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Running compliance check', { documentId, userId }, 'ComplianceService');

        const result = await repository.runComplianceCheck(documentId, options as any);

        logger.info('Compliance check completed', { documentId }, 'ComplianceService');

        return result;
      } catch (error) {
        logger.error('Failed to run compliance check', { documentId, error }, 'ComplianceService');
        throw error;
      }
    },

    async getCompliancePolicies(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching compliance policies', { schoolId, userId }, 'ComplianceService');

        const policies = await repository.getCompliancePolicies(schoolId);

        logger.info('Compliance policies fetched', { schoolId, count: policies.length }, 'ComplianceService');

        return policies;
      } catch (error) {
        logger.error('Failed to fetch compliance policies', { schoolId, error }, 'ComplianceService');
        throw error;
      }
    },

    async createCompliancePolicy(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('policy name is required');

        logger.info('Creating compliance policy', { schoolId, userId, name: data.name }, 'ComplianceService');

        const policy = await repository.createCompliancePolicy(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Compliance policy created successfully', { policyId: policy.id }, 'ComplianceService');

        return policy;
      } catch (error) {
        logger.error('Failed to create compliance policy', { schoolId, error }, 'ComplianceService');
        throw error;
      }
    },

    async updateCompliancePolicy(policyId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!policyId) throw new DocValidationError('policyId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating compliance policy', { policyId, userId }, 'ComplianceService');

        const updated = await repository.updateCompliancePolicy(policyId, data as any);

        logger.info('Compliance policy updated successfully', { policyId }, 'ComplianceService');

        return updated;
      } catch (error) {
        logger.error('Failed to update compliance policy', { policyId, error }, 'ComplianceService');
        throw error;
      }
    },

    async deleteCompliancePolicy(policyId: string, userId: string) {
      try {
        if (!policyId) throw new DocValidationError('policyId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting compliance policy', { policyId, userId }, 'ComplianceService');

        await repository.deleteCompliancePolicy(policyId);

        logger.info('Compliance policy deleted successfully', { policyId }, 'ComplianceService');
      } catch (error) {
        logger.error('Failed to delete compliance policy', { policyId, error }, 'ComplianceService');
        throw error;
      }
    },

    async getComplianceStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching compliance stats', { schoolId, userId }, 'ComplianceService');

        const stats = await repository.getComplianceStats(schoolId, dateFrom, dateTo);

        logger.info('Compliance stats fetched', { schoolId }, 'ComplianceService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch compliance stats', { schoolId, error }, 'ComplianceService');
        throw error;
      }
    },
  };
}
