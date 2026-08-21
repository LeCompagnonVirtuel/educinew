import type { AnalyticsRepository } from '../types';

export function createHrAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getHrAnalytics(filters?: any) {
      try {
        return await repository.getHrAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getWorkforceAnalytics(filters?: any) {
      try {
        return await repository.getWorkforceAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getTurnoverAnalytics(filters?: any) {
      try {
        return await repository.getTurnoverAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getHrAttendanceAnalytics(filters?: any) {
      try {
        return await repository.getHrAttendanceAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getTrainingAnalytics(filters?: any) {
      try {
        return await repository.getTrainingAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getHrPerformanceAnalytics(filters?: any) {
      try {
        return await repository.getHrPerformanceAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getCompensationAnalytics(filters?: any) {
      try {
        return await repository.getCompensationAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createHrService(repository: any) { return createHrAnalyticsService(repository); }
export function createWorkforceService(repository: any) { return createHrAnalyticsService(repository); }
export function createTurnoverService(repository: any) { return createHrAnalyticsService(repository); }
export function createTrainingService(repository: any) { return createHrAnalyticsService(repository); }
export function createPerformanceRatingService(repository: any) { return createHrAnalyticsService(repository); }
export function createCompensationService(repository: any) { return createHrAnalyticsService(repository); }
