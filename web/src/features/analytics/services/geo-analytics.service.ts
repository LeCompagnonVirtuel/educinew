import type { AnalyticsRepository } from '../types';

export function createGeoAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getGeoAnalytics(filters?: any) {
      try {
        return await repository.getGeoAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getRegionalBreakdown(region?: string, filters?: any) {
      try {
        return await repository.getRegionalBreakdown(region, filters);
      } catch (error) {
        throw error;
      }
    },

    async getMapData(filters?: any) {
      try {
        return await repository.getMapData(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createGeoMapService(repository: any) { return createGeoAnalyticsService(repository); }
export function createGeographicDistributionService(repository: any) { return createGeoAnalyticsService(repository); }
