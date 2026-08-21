import type { AnalyticsRepository } from '../types';

export function createDashboardService(repository: AnalyticsRepository) {
  return {
    async createDashboard(data: any) {
      try {
        return await repository.createDashboard(data);
      } catch (error) {
        throw error;
      }
    },

    async updateDashboard(id: string, data: any) {
      try {
        return await repository.updateDashboard(id, data);
      } catch (error) {
        throw error;
      }
    },

    async deleteDashboard(id: string) {
      try {
        return await repository.deleteDashboard(id);
      } catch (error) {
        throw error;
      }
    },

    async getDashboard(id: string) {
      try {
        return await repository.getDashboard(id);
      } catch (error) {
        throw error;
      }
    },

    async listDashboards(filters?: any) {
      try {
        return await repository.listDashboards(filters);
      } catch (error) {
        throw error;
      }
    },

    async shareDashboard(id: string, userIds: string[]) {
      try {
        return await repository.shareDashboard(id, userIds);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createDashboardsService(repository: any) { return createDashboardService(repository); }
export function createDashboardOverviewService(repository: any) { return createDashboardService(repository); }
