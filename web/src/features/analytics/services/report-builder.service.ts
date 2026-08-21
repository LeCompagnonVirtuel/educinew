import type { AnalyticsRepository } from '../types';

export function createReportBuilderService(repository: AnalyticsRepository) {
  return {
    async buildReport(config: Record<string, unknown>) {
      try {
        return await repository.createReport(config as any);
      } catch (error) {
        throw error;
      }
    },

    async customizeReport(reportId: string, config: Record<string, unknown>) {
      try {
        return await repository.updateReport(reportId, config as any);
      } catch (error) {
        throw error;
      }
    },
  };
}
