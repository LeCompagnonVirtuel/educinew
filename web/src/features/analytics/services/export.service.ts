import type { AnalyticsRepository } from '../types';

export function createExportService(repository: AnalyticsRepository) {
  return {
    async exportData(dataType: string, filters?: any, format?: string) {
      try {
        return await repository.exportData(dataType, filters, format);
      } catch (error) {
        throw error;
      }
    },

    async importData(dataType: string, file: any, options?: any) {
      try {
        return await repository.importData(dataType, file, options);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createImportService(repository: any) { return createExportService(repository); }
