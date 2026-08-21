import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgEventError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createEventService(repository: EnterpriseIntegrationRepository) {
  return {
    async publishEvent(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Publishing event', { schoolId, userId }, 'EventService');
        const result = await repository.publishEvent(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to publish event', { schoolId, error }, 'EventService');
        throw error;
      }
    },

    async listEvents(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing events', { schoolId, userId }, 'EventService');
        const result = await repository.listEvents(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list events', { schoolId, error }, 'EventService');
        throw error;
      }
    },

    async getEvent(schoolId: string, userId: string, eventId: string) {
      try {
        logger.info('Getting event', { schoolId, userId, eventId }, 'EventService');
        const result = await repository.getEvent(schoolId, eventId);
        return result;
      } catch (error) {
        logger.error('Failed to get event', { schoolId, eventId, error }, 'EventService');
        throw error;
      }
    },

    async getEventMetrics(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting event metrics', { schoolId, userId }, 'EventService');
        const result = await repository.getEventMetrics(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get event metrics', { schoolId, error }, 'EventService');
        throw error;
      }
    },

    async getEventsByType(schoolId: string, userId: string, eventType: string) {
      try {
        logger.info('Getting events by type', { schoolId, userId, eventType }, 'EventService');
        const result = await repository.getEventsByType(schoolId, eventType);
        return result;
      } catch (error) {
        logger.error('Failed to get events by type', { schoolId, eventType, error }, 'EventService');
        throw error;
      }
    },

    async deleteEvent(schoolId: string, userId: string, eventId: string) {
      try {
        logger.info('Deleting event', { schoolId, userId, eventId }, 'EventService');
        await repository.deleteEvent(schoolId, eventId);
      } catch (error) {
        logger.error('Failed to delete event', { schoolId, eventId, error }, 'EventService');
        throw error;
      }
    },
  };
}