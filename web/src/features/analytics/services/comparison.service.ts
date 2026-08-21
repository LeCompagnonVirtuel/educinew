import type { AnalyticsRepository } from '../types';

export function createComparisonService(repository: AnalyticsRepository) {
  return {
    async comparePeriods(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getRevenueAnalytics(schoolId, 'monthly');
      } catch (error) {
        throw error;
      }
    },

    async compareToTarget(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getBudgetVsActual(schoolId);
      } catch (error) {
        throw error;
      }
    },
  };
}
