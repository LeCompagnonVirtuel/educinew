import type { AnalyticsRepository } from '../types';

export function createTimelineAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getTimelineAnalytics(filters?: any) {
      try {
        return await repository.getTimelineAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getTimelineEvents(filters?: any) {
      try {
        return await repository.getTimelineEvents(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}
