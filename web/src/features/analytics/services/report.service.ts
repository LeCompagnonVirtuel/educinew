import type { AnalyticsRepository } from '../types';

export function createReportService(repository: AnalyticsRepository) {
  return {
    async createReport(data: any) {
      try {
        return await repository.createReport(data);
      } catch (error) {
        throw error;
      }
    },

    async updateReport(id: string, data: any) {
      try {
        return await repository.updateReport(id, data);
      } catch (error) {
        throw error;
      }
    },

    async deleteReport(id: string) {
      try {
        return await repository.deleteReport(id);
      } catch (error) {
        throw error;
      }
    },

    async getReport(id: string) {
      try {
        return await repository.getReport(id);
      } catch (error) {
        throw error;
      }
    },

    async listReports(filters?: any) {
      try {
        return await repository.listReports(filters);
      } catch (error) {
        throw error;
      }
    },

    async executeReport(id: string, params?: any) {
      try {
        return await repository.executeReport(id, params);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createReportsService(repository: any) { return createReportService(repository); }
export function createReportPreviewService(repository: any) { return createReportService(repository); }
