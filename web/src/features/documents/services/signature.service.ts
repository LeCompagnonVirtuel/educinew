import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocSignatureNotFoundError,
  DocSignatureCreateError,
  DocSignatureExpiredError,
  DocSignatureRejectedError,
  DocSignatureRevokedError,
  DocSignatureInvalidError,
  DocSignatureCertificateError,
  DocSignatureOrderError,
  DocSignatureRequiredError,
  DocSignatureDuplicateError,
  DocSignatureIntegrityError,
  DocSignatureChainError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createSignatureService(repository: DocumentRepositoryEnterprise) {
  return {
    async createSignatureRequest(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.documentId) throw new DocValidationError('documentId is required');

        logger.info('Creating signature request', { schoolId, userId, documentId: data.documentId }, 'SignatureService');

        const request = await repository.createSignatureRequest(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Signature request created successfully', { requestId: request.id }, 'SignatureService');

        return request;
      } catch (error) {
        logger.error('Failed to create signature request', { schoolId, error }, 'SignatureService');
        throw error;
      }
    },

    async approveSignature(signatureId: string, userId: string) {
      try {
        if (!signatureId) throw new DocValidationError('signatureId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Approving signature', { signatureId, userId }, 'SignatureService');

        const signature = await repository.getSignature(signatureId);
        if (!signature) throw new DocSignatureNotFoundError(signatureId);

        const approved = await repository.approveSignature(signatureId, userId);

        logger.info('Signature approved successfully', { signatureId }, 'SignatureService');

        return approved;
      } catch (error) {
        logger.error('Failed to approve signature', { signatureId, error }, 'SignatureService');
        throw error;
      }
    },

    async rejectSignature(signatureId: string, userId: string, reason?: string) {
      try {
        if (!signatureId) throw new DocValidationError('signatureId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Rejecting signature', { signatureId, userId }, 'SignatureService');

        const signature = await repository.getSignature(signatureId);
        if (!signature) throw new DocSignatureNotFoundError(signatureId);

        const rejected = await repository.rejectSignature(signatureId, userId, reason);

        logger.info('Signature rejected successfully', { signatureId }, 'SignatureService');

        return rejected;
      } catch (error) {
        logger.error('Failed to reject signature', { signatureId, error }, 'SignatureService');
        throw error;
      }
    },

    async revokeSignature(signatureId: string, userId: string) {
      try {
        if (!signatureId) throw new DocValidationError('signatureId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Revoking signature', { signatureId, userId }, 'SignatureService');

        const signature = await repository.getSignature(signatureId);
        if (!signature) throw new DocSignatureNotFoundError(signatureId);

        const revoked = await repository.revokeSignature(signatureId, userId);

        logger.info('Signature revoked successfully', { signatureId }, 'SignatureService');

        return revoked;
      } catch (error) {
        logger.error('Failed to revoke signature', { signatureId, error }, 'SignatureService');
        throw error;
      }
    },

    async getSignatureWorkflow(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching signature workflow', { documentId, userId }, 'SignatureService');

        const workflow = await repository.getSignatureWorkflow(documentId);

        logger.info('Signature workflow fetched', { documentId }, 'SignatureService');

        return workflow;
      } catch (error) {
        logger.error('Failed to fetch signature workflow', { documentId, error }, 'SignatureService');
        throw error;
      }
    },

    async getSignatureHistory(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching signature history', { documentId, userId }, 'SignatureService');

        const history = await repository.getSignatureHistory(documentId);

        logger.info('Signature history fetched', { documentId, count: history.length }, 'SignatureService');

        return history;
      } catch (error) {
        logger.error('Failed to fetch signature history', { documentId, error }, 'SignatureService');
        throw error;
      }
    },

    async getPendingSignatures(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching pending signatures', { schoolId, userId }, 'SignatureService');

        const signatures = await repository.getPendingSignatures(schoolId);

        logger.info('Pending signatures fetched', { schoolId, count: signatures.length }, 'SignatureService');

        return signatures;
      } catch (error) {
        logger.error('Failed to fetch pending signatures', { schoolId, error }, 'SignatureService');
        throw error;
      }
    },

    async getCompletedSignatures(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching completed signatures', { schoolId, userId }, 'SignatureService');

        const signatures = await repository.getCompletedSignatures(schoolId);

        logger.info('Completed signatures fetched', { schoolId, count: signatures.length }, 'SignatureService');

        return signatures;
      } catch (error) {
        logger.error('Failed to fetch completed signatures', { schoolId, error }, 'SignatureService');
        throw error;
      }
    },

    async getExpiredSignatures(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching expired signatures', { schoolId, userId }, 'SignatureService');

        const signatures = await repository.getExpiredSignatures(schoolId);

        logger.info('Expired signatures fetched', { schoolId, count: signatures.length }, 'SignatureService');

        return signatures;
      } catch (error) {
        logger.error('Failed to fetch expired signatures', { schoolId, error }, 'SignatureService');
        throw error;
      }
    },

    async getSignatureStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching signature stats', { schoolId, userId }, 'SignatureService');

        const stats = await repository.getSignatureStats(schoolId, dateFrom, dateTo);

        logger.info('Signature stats fetched', { schoolId }, 'SignatureService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch signature stats', { schoolId, error }, 'SignatureService');
        throw error;
      }
    },

    async validateSignature(signatureId: string, userId: string) {
      try {
        if (!signatureId) throw new DocValidationError('signatureId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Validating signature', { signatureId, userId }, 'SignatureService');

        const signature = await repository.getSignature(signatureId);
        if (!signature) throw new DocSignatureNotFoundError(signatureId);

        const isValid = await repository.validateSignature(signatureId);

        logger.info('Signature validated', { signatureId, isValid }, 'SignatureService');

        return isValid;
      } catch (error) {
        logger.error('Failed to validate signature', { signatureId, error }, 'SignatureService');
        throw error;
      }
    },

    async getSignatureCertificate(signatureId: string, userId: string) {
      try {
        if (!signatureId) throw new DocValidationError('signatureId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching signature certificate', { signatureId, userId }, 'SignatureService');

        const signature = await repository.getSignature(signatureId);
        if (!signature) throw new DocSignatureNotFoundError(signatureId);

        const certificate = await repository.getSignatureCertificate(signatureId);

        logger.info('Signature certificate fetched', { signatureId }, 'SignatureService');

        return certificate;
      } catch (error) {
        logger.error('Failed to fetch signature certificate', { signatureId, error }, 'SignatureService');
        throw error;
      }
    },

    async getSignatureAudit(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching signature audit', { documentId, userId }, 'SignatureService');

        const audit = await repository.getSignatureAudit(documentId);

        logger.info('Signature audit fetched', { documentId, count: audit.length }, 'SignatureService');

        return audit;
      } catch (error) {
        logger.error('Failed to fetch signature audit', { documentId, error }, 'SignatureService');
        throw error;
      }
    },

    async bulkSign(documentIds: string[], signerId: string, userId: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!signerId) throw new DocValidationError('signerId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Bulk signing documents', { count: documentIds.length, signerId, userId }, 'SignatureService');

        const result = await repository.bulkSign(documentIds, signerId);

        logger.info('Bulk sign completed', { result }, 'SignatureService');

        return result;
      } catch (error) {
        logger.error('Failed to bulk sign documents', { error }, 'SignatureService');
        throw error;
      }
    },

    async getSignatureReminders(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching signature reminders', { documentId, userId }, 'SignatureService');

        const reminders = await repository.getSignatureReminders(documentId);

        logger.info('Signature reminders fetched', { documentId, count: reminders.length }, 'SignatureService');

        return reminders;
      } catch (error) {
        logger.error('Failed to fetch signature reminders', { documentId, error }, 'SignatureService');
        throw error;
      }
    },

    async getSignatureTemplate(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching signature template', { documentId, userId }, 'SignatureService');

        const template = await repository.getSignatureTemplate(documentId);

        logger.info('Signature template fetched', { documentId }, 'SignatureService');

        return template;
      } catch (error) {
        logger.error('Failed to fetch signature template', { documentId, error }, 'SignatureService');
        throw error;
      }
    },

    async cancelSignatureRequest(requestId: string, userId: string) {
      try {
        if (!requestId) throw new DocValidationError('requestId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Cancelling signature request', { requestId, userId }, 'SignatureService');

        const cancelled = await repository.cancelSignatureRequest(requestId);

        logger.info('Signature request cancelled', { requestId }, 'SignatureService');

        return cancelled;
      } catch (error) {
        logger.error('Failed to cancel signature request', { requestId, error }, 'SignatureService');
        throw error;
      }
    },

    async updateSignatureRequest(requestId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!requestId) throw new DocValidationError('requestId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating signature request', { requestId, userId }, 'SignatureService');

        const updated = await repository.updateSignatureRequest(requestId, data as any);

        logger.info('Signature request updated', { requestId }, 'SignatureService');

        return updated;
      } catch (error) {
        logger.error('Failed to update signature request', { requestId, error }, 'SignatureService');
        throw error;
      }
    },
  };
}
