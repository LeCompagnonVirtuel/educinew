import type { AnalyticsRepository } from '../types';

export function createExecutiveDashboardService(repository: AnalyticsRepository) {
  return {
    async getExecutiveDashboard(filters?: any) {
      try {
        return await repository.getExecutiveDashboard(filters);
      } catch (error) {
        throw error;
      }
    },

    async getRevenueKPIs(filters?: any) {
      try {
        return await repository.getRevenueKPIs(filters);
      } catch (error) {
        throw error;
      }
    },

    async getFinancialKPIs(filters?: any) {
      try {
        return await repository.getFinancialKPIs(filters);
      } catch (error) {
        throw error;
      }
    },

    async getAcademicKPIs(filters?: any) {
      try {
        return await repository.getAcademicKPIs(filters);
      } catch (error) {
        throw error;
      }
    },

    async getHrKPIs(filters?: any) {
      try {
        return await repository.getHrKPIs(filters);
      } catch (error) {
        throw error;
      }
    },

    async getStudentKPIs(filters?: any) {
      try {
        return await repository.getStudentKPIs(filters);
      } catch (error) {
        throw error;
      }
    },

    async getTeacherKPIs(filters?: any) {
      try {
        return await repository.getTeacherKPIs(filters);
      } catch (error) {
        throw error;
      }
    },

    async getParentKPIs(filters?: any) {
      try {
        return await repository.getParentKPIs(filters);
      } catch (error) {
        throw error;
      }
    },

    async getSystemKPIs(filters?: any) {
      try {
        return await repository.getSystemKPIs(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createExecutiveService(repository: any) { return createExecutiveDashboardService(repository); }
