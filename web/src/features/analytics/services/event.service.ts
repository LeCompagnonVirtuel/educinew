import type { AnalyticsRepository } from '../types';

export function createEventService(repository: AnalyticsRepository) {
  return {
    async logAnalyticsEvent(eventData: any) {
      try {
        return await repository.logAnalyticsEvent(eventData);
      } catch (error) {
        throw error;
      }
    },

    async getAnalyticsEvents(filters?: any) {
      try {
        return await repository.getAnalyticsEvents(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createEventsService(repository: any) { return createEventService(repository); }
