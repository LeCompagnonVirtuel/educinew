import type { AnalyticsRepository } from '../types';

export function createTeacherAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getTeacherAnalytics(filters?: any) {
      try {
        return await repository.getTeacherAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getTeacherPerformanceAnalytics(filters?: any) {
      try {
        return await repository.getTeacherPerformanceAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getTeacherAttendanceAnalytics(filters?: any) {
      try {
        return await repository.getTeacherAttendanceAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getTeacherWorkloadAnalytics(filters?: any) {
      try {
        return await repository.getTeacherWorkloadAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getTeacherSatisfactionAnalytics(filters?: any) {
      try {
        return await repository.getTeacherSatisfactionAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getTeacherKPIsData(filters?: any) {
      try {
        return await repository.getTeacherKPIsData(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createTeachersService(repository: any) { return createTeacherAnalyticsService(repository); }
