import type { AnalyticsRepository } from '../types';

export function createEtlService(repository: AnalyticsRepository) {
  return {
    async runETLJob(jobId: string) {
      try {
        return await repository.runETL(jobId);
      } catch (error) {
        throw error;
      }
    },

    async getETLStatus() {
      try {
        return await repository.getETLJobs();
      } catch (error) {
        throw error;
      }
    },
  };
}
