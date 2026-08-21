import type { AnalyticsRepository } from '../types';

export function createNotificationService(repository: AnalyticsRepository) {
  return {
    async sendAlert(alertData: any) {
      try {
        return await repository.sendAlert(alertData);
      } catch (error) {
        throw error;
      }
    },

    async getAlertHistory(filters?: any) {
      try {
        return await repository.getAlertHistory(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createAlertsService(repository: any) { return createNotificationService(repository); }
