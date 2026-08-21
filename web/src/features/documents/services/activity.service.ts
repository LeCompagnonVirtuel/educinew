import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocActivityLogError,
  DocActivityNotFoundError,
  DocAuditError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createActivityService(repository: DocumentRepositoryEnterprise) {
  return {
    async logActivity(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.action) throw new DocValidationError('activity action is required');

        logger.info('Logging activity', { schoolId, userId, action: data.action }, 'ActivityService');

        const activity = await repository.logActivity(
          { ...data, userId } as any,
          schoolId
        );

        logger.info('Activity logged successfully', { activityId: activity.id }, 'ActivityService');

        return activity;
      } catch (error) {
        logger.error('Failed to log activity', { schoolId, userId, error }, 'ActivityService');
        throw error;
      }
    },

    async getActivitiesByDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching activities by document', { documentId, userId }, 'ActivityService');

        const activities = await repository.getDocumentActivities(documentId);

        logger.info('Activities by document fetched', { documentId, count: activities.length }, 'ActivityService');

        return activities;
      } catch (error) {
        logger.error('Failed to fetch activities by document', { documentId, error }, 'ActivityService');
        throw error;
      }
    },

    async getActivitiesByUser(schoolId: string, userId: string, targetUserId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!targetUserId) throw new DocValidationError('targetUserId is required');

        logger.info('Fetching activities by user', { schoolId, userId, targetUserId }, 'ActivityService');

        const activities = await repository.getUserActivities(schoolId, targetUserId);

        logger.info('Activities by user fetched', { schoolId, count: activities.length }, 'ActivityService');

        return activities;
      } catch (error) {
        logger.error('Failed to fetch activities by user', { schoolId, error }, 'ActivityService');
        throw error;
      }
    },

    async getActivitiesByDate(schoolId: string, userId: string, dateFrom: string, dateTo: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!dateFrom) throw new DocValidationError('dateFrom is required');
        if (!dateTo) throw new DocValidationError('dateTo is required');

        logger.info('Fetching activities by date', { schoolId, userId, dateFrom, dateTo }, 'ActivityService');

        const activities = await repository.getActivities(schoolId);
        const filtered = activities.filter((a: any) => {
          const createdAt = new Date(a.createdAt);
          return createdAt >= new Date(dateFrom) && createdAt <= new Date(dateTo);
        });

        logger.info('Activities by date fetched', { schoolId, count: filtered.length }, 'ActivityService');

        return filtered;
      } catch (error) {
        logger.error('Failed to fetch activities by date', { schoolId, error }, 'ActivityService');
        throw error;
      }
    },

    async getActivityStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching activity stats', { schoolId, userId }, 'ActivityService');

        const stats = await repository.getDocumentActivityStats(schoolId, dateFrom, dateTo);

        logger.info('Activity stats fetched', { schoolId }, 'ActivityService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch activity stats', { schoolId, error }, 'ActivityService');
        throw error;
      }
    },

    async getAuditTrail(schoolId: string, userId: string, documentId?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching audit trail', { schoolId, userId, documentId }, 'ActivityService');

        const auditTrail = await repository.getAuditTrail(schoolId, documentId);

        logger.info('Audit trail fetched', { schoolId, count: auditTrail.length }, 'ActivityService');

        return auditTrail;
      } catch (error) {
        logger.error('Failed to fetch audit trail', { schoolId, error }, 'ActivityService');
        throw error;
      }
    },

    async getActivities(schoolId: string, userId: string, filters?: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching activities', { schoolId, userId }, 'ActivityService');

        const activities = await repository.getActivities(schoolId, filters);

        logger.info('Activities fetched successfully', { schoolId, count: activities.length }, 'ActivityService');

        return activities;
      } catch (error) {
        logger.error('Failed to fetch activities', { schoolId, error }, 'ActivityService');
        throw error;
      }
    },

    async getActivity(activityId: string, userId: string) {
      try {
        if (!activityId) throw new DocValidationError('activityId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching activity', { activityId, userId }, 'ActivityService');

        const activities = await repository.getActivities('');
        const activity = activities.find((a: any) => a.id === activityId);
        if (!activity) throw new DocActivityNotFoundError(activityId);

        return activity;
      } catch (error) {
        logger.error('Failed to fetch activity', { activityId, error }, 'ActivityService');
        throw error;
      }
    },
  };
}
