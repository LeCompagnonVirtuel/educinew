import type { AnalyticsRepository } from '../types';

export function createBenchmarkService(repository: AnalyticsRepository) {
  return {
    async getBenchmarkData(dataSource: string, params?: Record<string, unknown>) {
      try {
        return await repository.getPerformanceBySchool();
      } catch (error) {
        throw error;
      }
    },

    async compareToBenchmark(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getPerformanceBySchool();
      } catch (error) {
        throw error;
      }
    },
  };
}
