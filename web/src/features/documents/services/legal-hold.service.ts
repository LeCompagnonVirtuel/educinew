import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocLegalHoldError,
  DocLegalHoldExistsError,
  DocLegalHoldReleaseError,
  DocLegalHoldExpiredError,
  DocLegalHoldComplianceError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createLegalHoldService(repository: DocumentRepositoryEnterprise) {
  return {
    async createLegalHold(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('legal hold name is required');

        logger.info('Creating legal hold', { schoolId, userId, name: data.name }, 'LegalHoldService');

        const hold = await repository.createLegalHold(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Legal hold created successfully', { holdId: hold.id }, 'LegalHoldService');

        return hold;
      } catch (error) {
        logger.error('Failed to create legal hold', { schoolId, error }, 'LegalHoldService');
        throw error;
      }
    },

    async releaseLegalHold(holdId: string, userId: string) {
      try {
        if (!holdId) throw new DocValidationError('holdId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Releasing legal hold', { holdId, userId }, 'LegalHoldService');

        const holds = await repository.getLegalHolds('');
        const hold = holds.find((h: any) => h.id === holdId);
        if (!hold) throw new DocValidationError('Legal hold not found');

        const released = await repository.releaseLegalHold(holdId);

        logger.info('Legal hold released successfully', { holdId }, 'LegalHoldService');

        return released;
      } catch (error) {
        logger.error('Failed to release legal hold', { holdId, error }, 'LegalHoldService');
        throw error;
      }
    },

    async getLegalHoldDocuments(holdId: string, userId: string) {
      try {
        if (!holdId) throw new DocValidationError('holdId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching legal hold documents', { holdId, userId }, 'LegalHoldService');

        const documents = await repository.getDocumentsOnHold('');

        logger.info('Legal hold documents fetched', { holdId, count: documents.length }, 'LegalHoldService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch legal hold documents', { holdId, error }, 'LegalHoldService');
        throw error;
      }
    },

    async getLegalHoldStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching legal hold stats', { schoolId, userId }, 'LegalHoldService');

        const holds = await repository.getLegalHolds(schoolId);
        const documents = await repository.getDocumentsOnHold(schoolId);
        const stats = {
          totalLegalHolds: holds.length,
          activeLegalHolds: holds.filter((h: any) => h.status === 'active').length,
          releasedLegalHolds: holds.filter((h: any) => h.status === 'released').length,
          documentsOnHold: documents.length,
        };

        logger.info('Legal hold stats fetched', { schoolId }, 'LegalHoldService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch legal hold stats', { schoolId, error }, 'LegalHoldService');
        throw error;
      }
    },

    async getLegalHoldHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching legal hold history', { schoolId, userId }, 'LegalHoldService');

        const holds = await repository.getLegalHolds(schoolId);

        logger.info('Legal hold history fetched', { schoolId, count: holds.length }, 'LegalHoldService');

        return holds;
      } catch (error) {
        logger.error('Failed to fetch legal hold history', { schoolId, error }, 'LegalHoldService');
        throw error;
      }
    },

    async validateLegalHold(holdId: string, userId: string) {
      try {
        if (!holdId) throw new DocValidationError('holdId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Validating legal hold', { holdId, userId }, 'LegalHoldService');

        const holds = await repository.getLegalHolds('');
        const hold = holds.find((h: any) => h.id === holdId);

        const isValid = !!hold && (hold as any).status === 'active';

        logger.info('Legal hold validated', { holdId, isValid }, 'LegalHoldService');

        return { holdId, isValid, hold };
      } catch (error) {
        logger.error('Failed to validate legal hold', { holdId, error }, 'LegalHoldService');
        throw error;
      }
    },

    async getLegalHoldCompliance(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching legal hold compliance', { schoolId, userId }, 'LegalHoldService');

        const holds = await repository.getLegalHolds(schoolId);
        const documents = await repository.getDocumentsOnHold(schoolId);

        const compliance = {
          totalHolds: holds.length,
          activeHolds: holds.filter((h: any) => h.status === 'active').length,
          documentsOnHold: documents.length,
          complianceRate: 100,
          lastChecked: new Date().toISOString(),
        };

        logger.info('Legal hold compliance fetched', { schoolId }, 'LegalHoldService');

        return compliance;
      } catch (error) {
        logger.error('Failed to fetch legal hold compliance', { schoolId, error }, 'LegalHoldService');
        throw error;
      }
    },

    async getLegalHolds(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching legal holds', { schoolId, userId }, 'LegalHoldService');

        const holds = await repository.getLegalHolds(schoolId);

        logger.info('Legal holds fetched successfully', { schoolId, count: holds.length }, 'LegalHoldService');

        return holds;
      } catch (error) {
        logger.error('Failed to fetch legal holds', { schoolId, error }, 'LegalHoldService');
        throw error;
      }
    },
  };
}
