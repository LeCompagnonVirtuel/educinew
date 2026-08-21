import type { AnalyticsRepository } from '../types';

export function createHeatmapAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getHeatmapAnalytics(filters?: any) {
      try {
        return await repository.getHeatmapAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async generateHeatmap(config: any) {
      try {
        return await repository.generateHeatmap(config);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createHeatmapService(repository: any) { return createHeatmapAnalyticsService(repository); }
