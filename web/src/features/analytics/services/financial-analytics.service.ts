import type { AnalyticsRepository } from '../types';

export function createFinancialAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getFinancialAnalytics(filters?: any) {
      try {
        return await repository.getFinancialAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getRevenueAnalytics(filters?: any) {
      try {
        return await repository.getRevenueAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getExpenseAnalytics(filters?: any) {
      try {
        return await repository.getExpenseAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getProfitAnalytics(filters?: any) {
      try {
        return await repository.getProfitAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getCashFlowAnalytics(filters?: any) {
      try {
        return await repository.getCashFlowAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getPaymentAnalytics(filters?: any) {
      try {
        return await repository.getPaymentAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getFinancialForecast(filters?: any) {
      try {
        return await repository.getFinancialForecast(filters);
      } catch (error) {
        throw error;
      }
    },

    async getBudgetVsActual(filters?: any) {
      try {
        return await repository.getBudgetVsActual(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createFinancialService(repository: any) { return createFinancialAnalyticsService(repository); }
export function createRevenueTrendService(repository: any) { return createFinancialAnalyticsService(repository); }
export function createExpenseTrendService(repository: any) { return createFinancialAnalyticsService(repository); }
export function createPaymentStatusService(repository: any) { return createFinancialAnalyticsService(repository); }
export function createCashFlowService(repository: any) { return createFinancialAnalyticsService(repository); }
export function createBudgetUtilizationService(repository: any) { return createFinancialAnalyticsService(repository); }
