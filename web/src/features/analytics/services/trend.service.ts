import type { AnalyticsRepository } from '../types';

export function createTrendService(repository: AnalyticsRepository) {
  return {
    async getTrendAnalysis(dataSource: string, params?: Record<string, unknown>) {
      try {
        return await repository.getChartData('enrollment' as any, 'line' as any, { ...params, dataSource });
      } catch (error) {
        throw error;
      }
    },

    async forecastTrend(dataSource: string, params?: Record<string, unknown>) {
      try {
        return await repository.getFinancialForecast(dataSource);
      } catch (error) {
        throw error;
      }
    },
  };
}
