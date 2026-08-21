import type { AnalyticsRepository } from '../types';

export function createDataWarehouseService(repository: AnalyticsRepository) {
  return {
    async getFactTable(tableName: string, filters?: any) {
      try {
        return await repository.getFactTable(tableName, filters);
      } catch (error) {
        throw error;
      }
    },

    async getDimension(dimensionName: string, filters?: any) {
      try {
        return await repository.getDimension(dimensionName, filters);
      } catch (error) {
        throw error;
      }
    },

    async runETL(config: any) {
      try {
        return await repository.runETL(config);
      } catch (error) {
        throw error;
      }
    },

    async getETLJobs(filters?: any) {
      try {
        return await repository.getETLJobs(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createFactTableService(repository: any) { return createDataWarehouseService(repository); }
export function createDimensionsService(repository: any) { return createDataWarehouseService(repository); }
