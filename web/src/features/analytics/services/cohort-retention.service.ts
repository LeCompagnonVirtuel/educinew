import type { AnalyticsRepository } from '../types';

export function createCohortRetentionService(repository: AnalyticsRepository) {
  return {
    async getRetentionData(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getEnrollmentAnalytics(schoolId, 'monthly');
      } catch (error) {
        throw error;
      }
    },

    async getChurnRate(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getEnrollmentAnalytics(schoolId, 'monthly');
      } catch (error) {
        throw error;
      }
    },
  };
}
