import type { AnalyticsRepository } from '../types';

export function createPredictiveAiService(repository: AnalyticsRepository) {
  return {
    async runPredictiveModel(modelType: string, params?: any) {
      try {
        return await repository.runPredictiveModel(modelType, params);
      } catch (error) {
        throw error;
      }
    },

    async getPredictions(modelType: string, filters?: any) {
      try {
        return await repository.getPredictions(modelType, filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createPredictiveService(repository: any) { return createPredictiveAiService(repository); }
export function createPredictionsService(repository: any) { return createPredictiveAiService(repository); }
