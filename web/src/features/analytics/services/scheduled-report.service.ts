import type { AnalyticsRepository } from '../types';

export function createScheduledReportService(repository: AnalyticsRepository) {
  return {
    async createScheduledReport(data: any) {
      try {
        return await repository.createScheduledReport(data);
      } catch (error) {
        throw error;
      }
    },

    async updateScheduledReport(id: string, data: any) {
      try {
        return await repository.updateScheduledReport(id, data);
      } catch (error) {
        throw error;
      }
    },

    async deleteScheduledReport(id: string) {
      try {
        return await repository.deleteScheduledReport(id);
      } catch (error) {
        throw error;
      }
    },

    async listScheduledReports(filters?: any) {
      try {
        return await repository.listScheduledReports(filters);
      } catch (error) {
        throw error;
      }
    },

    async executeScheduledReport(id: string) {
      try {
        return await repository.executeScheduledReport(id);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createScheduledReportsService(repository: any) { return createScheduledReportService(repository); }
