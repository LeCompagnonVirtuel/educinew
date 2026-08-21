import type { AnalyticsRepository } from '../types';

export function createFunnelAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getFunnelAnalytics(funnelId: string, filters?: any) {
      try {
        return await repository.getFunnelAnalytics(funnelId, filters);
      } catch (error) {
        throw error;
      }
    },

    async getConversionRates(funnelId: string, filters?: any) {
      try {
        return await repository.getConversionRates(funnelId, filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createFunnelService(repository: any) { return createFunnelAnalyticsService(repository); }
