import type { AnalyticsRepository } from '../types';

export function createAggregationService(repository: AnalyticsRepository) {
  return {
    async aggregateData(dataSource: string, params?: Record<string, unknown>) {
      try {
        return await repository.getFactTable({ ...params, metric: dataSource });
      } catch (error) {
        throw error;
      }
    },

    async aggregateByDimension(dimension: string, params?: Record<string, unknown>) {
      try {
        return await repository.getDimension(dimension);
      } catch (error) {
        throw error;
      }
    },

    async aggregateByPeriod(period: string, schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getRevenueAnalytics(schoolId, period as any);
      } catch (error) {
        throw error;
      }
    },
  };
}
