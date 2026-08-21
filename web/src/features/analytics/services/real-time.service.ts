import type { AnalyticsRepository } from '../types';

export function createRealTimeService(repository: AnalyticsRepository) {
  return {
    async getRealTimeData(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getSystemKPIs();
      } catch (error) {
        throw error;
      }
    },

    async subscribeToUpdates(schoolId: string, callback?: (data: unknown) => void) {
      try {
        return await repository.getSystemKPIs();
      } catch (error) {
        throw error;
      }
    },
  };
}
