import type { AnalyticsRepository } from '../types';

export function createKpiService(repository: AnalyticsRepository) {
  return {
    async getKPI(kpiId: string, filters?: any) {
      try {
        return await repository.getKPI(kpiId, filters);
      } catch (error) {
        throw error;
      }
    },

    async getKPITrend(kpiId: string, period?: string) {
      try {
        return await repository.getKPITrend(kpiId, period);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createRevenueKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}

export function createStudentKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}

export function createTeacherKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}

export function createAttendanceKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}

export function createPerformanceKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}

export function createEnrollmentKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}

export function createRetentionKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}

export function createSatisfactionKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}

export function createCostKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}

export function createProfitKpiService(repository: AnalyticsRepository) {
  return createKpiService(repository);
}
