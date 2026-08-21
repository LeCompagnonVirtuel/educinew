import type { AnalyticsRepository } from '../types';

export function createCohortService(repository: AnalyticsRepository) {
  return {
    async getCohortAnalysis(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getEnrollmentAnalytics(schoolId, 'monthly');
      } catch (error) {
        throw error;
      }
    },

    async getCohortRetention(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getEnrollmentAnalytics(schoolId, 'monthly');
      } catch (error) {
        throw error;
      }
    },
  };
}
