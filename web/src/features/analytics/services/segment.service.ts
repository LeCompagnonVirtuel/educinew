import type { AnalyticsRepository } from '../types';

export function createSegmentService(repository: AnalyticsRepository) {
  return {
    async getSegmentData(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getEnrollmentAnalytics(schoolId, 'monthly');
      } catch (error) {
        throw error;
      }
    },

    async createSegment(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getEnrollmentAnalytics(schoolId, 'monthly');
      } catch (error) {
        throw error;
      }
    },
  };
}
