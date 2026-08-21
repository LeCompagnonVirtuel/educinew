import type { AnalyticsRepository } from '../types';

export function createWidgetService(repository: AnalyticsRepository) {
  return {
    async addWidget(dashboardId: string, widgetData: any) {
      try {
        return await repository.addWidget(dashboardId, widgetData);
      } catch (error) {
        throw error;
      }
    },

    async updateWidget(widgetId: string, data: any) {
      try {
        return await repository.updateWidget(widgetId, data);
      } catch (error) {
        throw error;
      }
    },

    async removeWidget(widgetId: string) {
      try {
        return await repository.removeWidget(widgetId);
      } catch (error) {
        throw error;
      }
    },
  };
}
