import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCheckoutError,
  DocVersionConflictError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createCheckoutService(repository: DocumentRepositoryEnterprise) {
  return {
    async checkoutDocument(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Checking out document', { documentId, schoolId, userId }, 'CheckoutService');

        const checkout = await repository.checkoutDocument(documentId, userId);

        logger.info('Document checked out successfully', { documentId, checkoutId: checkout.id }, 'CheckoutService');

        return checkout;
      } catch (error) {
        logger.error('Failed to checkout document', { documentId, error }, 'CheckoutService');
        throw error;
      }
    },

    async checkinDocument(documentId: string, schoolId: string, userId: string, data?: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Checking in document', { documentId, schoolId, userId }, 'CheckoutService');

        const document = await repository.checkinDocument(documentId, userId);

        logger.info('Document checked in successfully', { documentId }, 'CheckoutService');

        return document;
      } catch (error) {
        logger.error('Failed to checkin document', { documentId, error }, 'CheckoutService');
        throw error;
      }
    },

    async getCheckedOutDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching checked out documents', { schoolId, userId }, 'CheckoutService');

        const documents = await repository.getCheckedOutDocuments(schoolId);

        logger.info('Checked out documents fetched', { schoolId, count: documents.length }, 'CheckoutService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch checked out documents', { schoolId, error }, 'CheckoutService');
        throw error;
      }
    },

    async forceCheckin(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Force checking in document', { documentId, schoolId, userId }, 'CheckoutService');

        const document = await repository.checkinDocument(documentId, userId);

        logger.info('Document force checked in', { documentId }, 'CheckoutService');

        return document;
      } catch (error) {
        logger.error('Failed to force checkin document', { documentId, error }, 'CheckoutService');
        throw error;
      }
    },
  };
}
