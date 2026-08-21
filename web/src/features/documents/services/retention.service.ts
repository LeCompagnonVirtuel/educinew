import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocRetentionError,
  DocRetentionScheduleError,
  DocRetentionDisposalError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createRetentionService(repository: DocumentRepositoryEnterprise) {
  return {
    async getRetentionSchedules(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching retention schedules', { schoolId, userId }, 'RetentionService');

        const schedules = await repository.getRetentionSchedules(schoolId);

        logger.info('Retention schedules fetched', { schoolId, count: schedules.length }, 'RetentionService');

        return schedules;
      } catch (error) {
        logger.error('Failed to fetch retention schedules', { schoolId, error }, 'RetentionService');
        throw error;
      }
    },

    async createRetentionSchedule(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('schedule name is required');

        logger.info('Creating retention schedule', { schoolId, userId, name: data.name }, 'RetentionService');

        const schedule = await repository.createRetentionSchedule(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Retention schedule created successfully', { scheduleId: schedule.id }, 'RetentionService');

        return schedule;
      } catch (error) {
        logger.error('Failed to create retention schedule', { schoolId, error }, 'RetentionService');
        throw error;
      }
    },

    async updateRetentionSchedule(scheduleId: string, userId: string, data: Record<string, unknown>, schoolId: string) {
      try {
        if (!scheduleId) throw new DocValidationError('scheduleId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Updating retention schedule', { scheduleId, userId }, 'RetentionService');

        const schedules = await repository.getRetentionSchedules(schoolId);
        const existing = schedules.find((s) => s.id === scheduleId);
        if (!existing) throw new DocRetentionScheduleError('Retention schedule not found');

        const updated = await repository.updateRetentionSchedule(scheduleId, data as any);

        logger.info('Retention schedule updated successfully', { scheduleId }, 'RetentionService');

        return updated;
      } catch (error) {
        logger.error('Failed to update retention schedule', { scheduleId, error }, 'RetentionService');
        throw error;
      }
    },

    async deleteRetentionSchedule(scheduleId: string, userId: string, schoolId: string) {
      try {
        if (!scheduleId) throw new DocValidationError('scheduleId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Deleting retention schedule', { scheduleId, userId }, 'RetentionService');

        const schedules = await repository.getRetentionSchedules(schoolId);
        const existing = schedules.find((s) => s.id === scheduleId);
        if (!existing) throw new DocRetentionScheduleError('Retention schedule not found');

        await repository.deleteRetentionSchedule(scheduleId);

        logger.info('Retention schedule deleted successfully', { scheduleId }, 'RetentionService');
      } catch (error) {
        logger.error('Failed to delete retention schedule', { scheduleId, error }, 'RetentionService');
        throw error;
      }
    },

    async getDocumentsForDisposition(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents for disposition', { schoolId, userId }, 'RetentionService');

        const documents = await repository.getDocumentsForDisposition(schoolId);

        logger.info('Documents for disposition fetched', { schoolId, count: documents.length }, 'RetentionService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents for disposition', { schoolId, error }, 'RetentionService');
        throw error;
      }
    },

    async disposeDocument(documentId: string, userId: string, options?: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Disposing document', { documentId, userId }, 'RetentionService');

        const result = await repository.disposeDocument(documentId, options as any);

        logger.info('Document disposed successfully', { documentId }, 'RetentionService');

        return result;
      } catch (error) {
        logger.error('Failed to dispose document', { documentId, error }, 'RetentionService');
        throw error;
      }
    },

    async getRetentionStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching retention stats', { schoolId, userId }, 'RetentionService');

        const stats = await repository.getRetentionStats(schoolId);

        logger.info('Retention stats fetched', { schoolId }, 'RetentionService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch retention stats', { schoolId, error }, 'RetentionService');
        throw error;
      }
    },
  };
}
