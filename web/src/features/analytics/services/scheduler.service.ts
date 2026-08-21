import type { AnalyticsRepository } from '../types';

export function createSchedulerService(repository: AnalyticsRepository) {
  return {
    async scheduleReport(config: Record<string, unknown>) {
      try {
        return await repository.createScheduledReport(config as any);
      } catch (error) {
        throw error;
      }
    },

    async unscheduleReport(reportId: string) {
      try {
        return await repository.deleteScheduledReport(reportId);
      } catch (error) {
        throw error;
      }
    },
  };
}
