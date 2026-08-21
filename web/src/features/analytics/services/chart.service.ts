import type { AnalyticsRepository } from '../types';

export function createChartService(repository: AnalyticsRepository) {
  return {
    async getChartData(chartType: string, filters?: any) {
      try {
        return await repository.getChartData(chartType, filters);
      } catch (error) {
        throw error;
      }
    },

    async getGeoMapData(filters?: any) {
      try {
        return await repository.getGeoMapData(filters);
      } catch (error) {
        throw error;
      }
    },

    async getHeatmapData(filters?: any) {
      try {
        return await repository.getHeatmapData(filters);
      } catch (error) {
        throw error;
      }
    },

    async getFunnelData(filters?: any) {
      try {
        return await repository.getFunnelData(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createChartsService(repository: any) { return createChartService(repository); }
export function createChartPreviewService(repository: any) { return createChartService(repository); }
export function createDataTableService(repository: any) { return createChartService(repository); }
export function createFilterBuilderService(repository: any) { return createChartService(repository); }
export function createColumnConfigService(repository: any) { return createChartService(repository); }
export function createSortConfigService(repository: any) { return createChartService(repository); }
export function createPaginationService(repository: any) { return createChartService(repository); }
export function createSearchService(repository: any) { return createChartService(repository); }
export function createFiltersService(repository: any) { return createChartService(repository); }
export function createDateRangeService(repository: any) { return createChartService(repository); }
