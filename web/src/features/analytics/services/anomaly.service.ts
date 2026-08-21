import type { AnalyticsRepository } from '../types';

export function createAnomalyService(repository: AnalyticsRepository) {
  return {
    async detectAnomalies(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getPredictiveResults(schoolId, 'academic_risk');
      } catch (error) {
        throw error;
      }
    },

    async getAnomalyReport(schoolId: string, params?: Record<string, unknown>) {
      try {
        return await repository.getPredictions('academic_risk', schoolId);
      } catch (error) {
        throw error;
      }
    },
  };
}
