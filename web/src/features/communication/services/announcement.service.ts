import type { CommunicationRepositoryExtended, Announcement } from '@/features/communication/types';
import {
  CommAnnouncementNotFoundError,
  CommAnnouncementAccessDeniedError,
  CommAnnouncementAlreadyPublishedError,
  CommAnnouncementExpiredError,
  AnnouncementScheduleError,
  AnnouncementTargetError,
  AnnouncementPriorityError,
  AnnouncementAcknowledgeError,
  AnnouncementBulkError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createAnnouncementService(repository: CommunicationRepositoryExtended) {
  return {
    async getAnnouncements(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching announcements', { schoolId, userId }, 'AnnouncementService');

        const announcements = await repository.getAnnouncements(schoolId, userId, filters);

        logger.info('Announcements fetched', { schoolId, count: announcements.length }, 'AnnouncementService');

        return announcements;
      } catch (error) {
        logger.error('Failed to fetch announcements', { schoolId }, 'AnnouncementService');
        throw error;
      }
    },

    async getAnnouncement(announcementId: string, userId: string) {
      try {
        if (!announcementId) throw new Error('announcementId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching announcement', { announcementId, userId }, 'AnnouncementService');

        const announcement = await repository.getAnnouncement(announcementId);
        if (!announcement) throw new CommAnnouncementNotFoundError(announcementId);

        return announcement;
      } catch (error) {
        logger.error('Failed to fetch announcement', { announcementId }, 'AnnouncementService');
        throw error;
      }
    },

    async createAnnouncement(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.title) throw new Error('announcement title is required');
        if (!data.content) throw new Error('announcement content is required');
        if (data.priority && !['low', 'normal', 'high', 'urgent'].includes(data.priority)) {
          throw new AnnouncementPriorityError(data.priority);
        }

        logger.info('Creating announcement', { schoolId, userId, title: data.title }, 'AnnouncementService');

        const announcement = await repository.createAnnouncement({
          ...data,
          schoolId,
          createdBy: userId,
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'announcement.created', {
          announcementId: announcement.id,
          userId,
        });

        logger.info('Announcement created', { announcementId: announcement.id }, 'AnnouncementService');

        return announcement;
      } catch (error) {
        logger.error('Failed to create announcement', { schoolId }, 'AnnouncementService');
        throw error;
      }
    },

    async updateAnnouncement(announcementId: string, userId: string, data: any) {
      try {
        if (!announcementId) throw new Error('announcementId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating announcement', { announcementId, userId }, 'AnnouncementService');

        const existing = await repository.getAnnouncement(announcementId);
        if (!existing) throw new CommAnnouncementNotFoundError(announcementId);

        const updated = await repository.updateAnnouncement(announcementId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'announcement.updated', {
          announcementId,
          userId,
        });

        logger.info('Announcement updated', { announcementId }, 'AnnouncementService');

        return updated;
      } catch (error) {
        logger.error('Failed to update announcement', { announcementId }, 'AnnouncementService');
        throw error;
      }
    },

    async deleteAnnouncement(announcementId: string, userId: string) {
      try {
        if (!announcementId) throw new Error('announcementId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting announcement', { announcementId, userId }, 'AnnouncementService');

        const existing = await repository.getAnnouncement(announcementId);
        if (!existing) throw new CommAnnouncementNotFoundError(announcementId);

        await repository.deleteAnnouncement(announcementId);

        await repository.logCommunicationEvent(existing.schoolId, 'announcement.deleted', {
          announcementId,
          userId,
        });

        logger.info('Announcement deleted', { announcementId }, 'AnnouncementService');
      } catch (error) {
        logger.error('Failed to delete announcement', { announcementId }, 'AnnouncementService');
        throw error;
      }
    },

    async publishAnnouncement(announcementId: string, userId: string) {
      try {
        if (!announcementId) throw new Error('announcementId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Publishing announcement', { announcementId, userId }, 'AnnouncementService');

        const existing = await repository.getAnnouncement(announcementId);
        if (!existing) throw new CommAnnouncementNotFoundError(announcementId);
        if ((existing as any).status === 'published') throw new CommAnnouncementAlreadyPublishedError(announcementId);

        const published = await repository.updateAnnouncement(announcementId, {
          status: 'published',
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'announcement.published', {
          announcementId,
          userId,
        });

        logger.info('Announcement published', { announcementId }, 'AnnouncementService');

        return published;
      } catch (error) {
        logger.error('Failed to publish announcement', { announcementId }, 'AnnouncementService');
        throw error;
      }
    },

    async acknowledgeAnnouncement(announcementId: string, userId: string) {
      try {
        if (!announcementId) throw new Error('announcementId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Acknowledging announcement', { announcementId, userId }, 'AnnouncementService');

        const existing = await repository.getAnnouncement(announcementId);
        if (!existing) throw new CommAnnouncementNotFoundError(announcementId);

        const acknowledgment = await repository.acknowledgeAnnouncement(announcementId, userId);

        await repository.logCommunicationEvent(existing.schoolId, 'announcement.acknowledged', {
          announcementId,
          userId,
        });

        logger.info('Announcement acknowledged', { announcementId, userId }, 'AnnouncementService');

        return acknowledgment;
      } catch (error) {
        logger.error('Failed to acknowledge announcement', { announcementId }, 'AnnouncementService');
        throw error;
      }
    },

    async getAnnouncementStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching announcement stats', { schoolId, dateFrom, dateTo }, 'AnnouncementService');

        const stats = await repository.getAnnouncementStats(schoolId, dateFrom, dateTo);

        logger.info('Announcement stats fetched', { schoolId }, 'AnnouncementService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch announcement stats', { schoolId }, 'AnnouncementService');
        throw error;
      }
    },

    async getUnacknowledgedAnnouncements(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching unacknowledged announcements', { schoolId, userId }, 'AnnouncementService');

        const announcements = await repository.getUnacknowledgedAnnouncements(schoolId, userId);

        logger.info('Unacknowledged announcements fetched', { schoolId, count: announcements.length }, 'AnnouncementService');

        return announcements;
      } catch (error) {
        logger.error('Failed to fetch unacknowledged announcements', { schoolId }, 'AnnouncementService');
        throw error;
      }
    },

    async bulkPublishAnnouncements(announcementIds: string[], userId: string) {
      try {
        if (!announcementIds || announcementIds.length === 0) throw new Error('announcementIds are required');
        if (!userId) throw new Error('userId is required');

        logger.info('Bulk publishing announcements', { count: announcementIds.length, userId }, 'AnnouncementService');

        const results = [];
        for (const id of announcementIds) {
          const existing = await repository.getAnnouncement(id);
          if (existing && (existing as any).status !== 'published') {
            const published = await repository.updateAnnouncement(id, {
              status: 'published',
              publishedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            results.push(published);
          }
        }

        logger.info('Announcements bulk published', { count: results.length }, 'AnnouncementService');

        return results;
      } catch (error) {
        logger.error('Failed to bulk publish announcements', {}, 'AnnouncementService');
        throw error;
      }
    },
  };
}
