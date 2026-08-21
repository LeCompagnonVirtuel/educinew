import type { AnalyticsRepository } from '../types';

export function createDataSourceService(repository: AnalyticsRepository) {
  return {
    async getDataSource(sourceId: string) {
      try {
        return await repository.getDataSource(sourceId);
      } catch (error) {
        throw error;
      }
    },

    async getAvailableDataSources(filters?: any) {
      try {
        return await repository.getAvailableDataSources(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createDataSourcesService(repository: any) { return createDataSourceService(repository); }
