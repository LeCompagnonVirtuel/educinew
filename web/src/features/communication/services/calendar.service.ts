import type { CommunicationRepositoryExtended, CalendarEvent } from '@/features/communication/types';
import {
  CommCalendarEventNotFoundError,
  CommCalendarEventConflictError,
  CommCalendarEventPastError,
  CommCalendarRecurrenceError,
  CommCalendarReminderError,
  CommCalendarAttendeeError,
  CommCalendarPermissionError,
  CommCalendarSubscriptionError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createCalendarService(repository: CommunicationRepositoryExtended) {
  return {
    async getCalendarEvents(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching calendar events', { schoolId, userId }, 'CalendarService');

        const events = await repository.getCalendarEvents(schoolId, userId, filters);

        logger.info('Calendar events fetched', { schoolId, count: events.length }, 'CalendarService');

        return events;
      } catch (error) {
        logger.error('Failed to fetch calendar events', { schoolId }, 'CalendarService');
        throw error;
      }
    },

    async getCalendarEvent(eventId: string, userId: string) {
      try {
        if (!eventId) throw new Error('eventId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching calendar event', { eventId, userId }, 'CalendarService');

        const event = await repository.getCalendarEvent(eventId);
        if (!event) throw new CommCalendarEventNotFoundError(eventId);

        return event;
      } catch (error) {
        logger.error('Failed to fetch calendar event', { eventId }, 'CalendarService');
        throw error;
      }
    },

    async createCalendarEvent(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.title) throw new Error('event title is required');
        if (!data.startTime) throw new Error('event startTime is required');
        if (!data.endTime) throw new Error('event endTime is required');

        logger.info('Creating calendar event', { schoolId, userId, title: data.title }, 'CalendarService');

        const event = await repository.createCalendarEvent({
          ...data,
          schoolId,
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'calendar_event.created', {
          eventId: event.id,
          userId,
        });

        logger.info('Calendar event created', { eventId: event.id }, 'CalendarService');

        return event;
      } catch (error) {
        logger.error('Failed to create calendar event', { schoolId }, 'CalendarService');
        throw error;
      }
    },

    async updateCalendarEvent(eventId: string, userId: string, data: any) {
      try {
        if (!eventId) throw new Error('eventId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating calendar event', { eventId, userId }, 'CalendarService');

        const existing = await repository.getCalendarEvent(eventId);
        if (!existing) throw new CommCalendarEventNotFoundError(eventId);

        const updated = await repository.updateCalendarEvent(eventId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'calendar_event.updated', {
          eventId,
          userId,
        });

        logger.info('Calendar event updated', { eventId }, 'CalendarService');

        return updated;
      } catch (error) {
        logger.error('Failed to update calendar event', { eventId }, 'CalendarService');
        throw error;
      }
    },

    async deleteCalendarEvent(eventId: string, userId: string) {
      try {
        if (!eventId) throw new Error('eventId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting calendar event', { eventId, userId }, 'CalendarService');

        const existing = await repository.getCalendarEvent(eventId);
        if (!existing) throw new CommCalendarEventNotFoundError(eventId);

        await repository.deleteCalendarEvent(eventId);

        await repository.logCommunicationEvent((existing as any).schoolId, 'calendar_event.deleted', {
          eventId,
          userId,
        });

        logger.info('Calendar event deleted', { eventId }, 'CalendarService');
      } catch (error) {
        logger.error('Failed to delete calendar event', { eventId }, 'CalendarService');
        throw error;
      }
    },

    async respondToEvent(eventId: string, userId: string, response: string) {
      try {
        if (!eventId) throw new Error('eventId is required');
        if (!userId) throw new Error('userId is required');
        if (!response) throw new Error('response is required');
        if (!['accepted', 'declined', 'tentative'].includes(response)) {
          throw new CommCalendarAttendeeError('Invalid response type');
        }

        logger.info('Responding to calendar event', { eventId, userId, response }, 'CalendarService');

        const event = await repository.getCalendarEvent(eventId);
        if (!event) throw new CommCalendarEventNotFoundError(eventId);

        const attendeeResponse = await repository.updateCalendarEvent(eventId, {
          attendees: [
            ...((event as any).attendees || []),
            { userId, response, respondedAt: new Date().toISOString() },
          ],
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((event as any).schoolId, 'calendar_event.responded', {
          eventId,
          userId,
          response,
        });

        logger.info('Calendar event response recorded', { eventId, response }, 'CalendarService');

        return attendeeResponse;
      } catch (error) {
        logger.error('Failed to respond to calendar event', { eventId }, 'CalendarService');
        throw error;
      }
    },

    async getCalendarSubscriptions(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching calendar subscriptions', { schoolId, userId }, 'CalendarService');

        const subscriptions = await repository.getCalendarSubscriptions(schoolId, userId);

        logger.info('Calendar subscriptions fetched', { schoolId, count: subscriptions.length }, 'CalendarService');

        return subscriptions;
      } catch (error) {
        logger.error('Failed to fetch calendar subscriptions', { schoolId }, 'CalendarService');
        throw error;
      }
    },

    async getCalendarStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching calendar stats', { schoolId, dateFrom, dateTo }, 'CalendarService');

        const stats = await repository.getCalendarStats(schoolId, dateFrom, dateTo);

        logger.info('Calendar stats fetched', { schoolId }, 'CalendarService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch calendar stats', { schoolId }, 'CalendarService');
        throw error;
      }
    },

    async getUpcomingEvents(schoolId: string, userId: string, days?: number) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        const dateFrom = new Date().toISOString();
        const dateTo = new Date(Date.now() + (days || 7) * 24 * 60 * 60 * 1000).toISOString();

        logger.info('Fetching upcoming events', { schoolId, userId, days }, 'CalendarService');

        const events = await repository.getCalendarEvents(schoolId, userId, { dateFrom, dateTo });

        logger.info('Upcoming events fetched', { schoolId, count: events.length }, 'CalendarService');

        return events;
      } catch (error) {
        logger.error('Failed to fetch upcoming events', { schoolId }, 'CalendarService');
        throw error;
      }
    },

    async getRecurringEvents(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching recurring events', { schoolId, userId }, 'CalendarService');

        const events = await repository.getCalendarEvents(schoolId, userId, { recurring: true });

        logger.info('Recurring events fetched', { schoolId, count: events.length }, 'CalendarService');

        return events;
      } catch (error) {
        logger.error('Failed to fetch recurring events', { schoolId }, 'CalendarService');
        throw error;
      }
    },
  };
}
