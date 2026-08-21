import type { AnalyticsRepository } from '../types';

export function createDashboardBuilderService(repository: AnalyticsRepository) {
  return {
    async buildDashboard(config: Record<string, unknown>) {
      try {
        return await repository.createDashboard(config as any);
      } catch (error) {
        throw error;
      }
    },

    async addWidgetToDashboard(dashboardId: string, widget: Record<string, unknown>) {
      try {
        return await repository.addWidget(dashboardId, widget as any);
      } catch (error) {
        throw error;
      }
    },
  };
}
