import type { AnalyticsRepository } from '../types';

export function createParentAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getParentAnalytics(filters?: any) {
      try {
        return await repository.getParentAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getParentPaymentAnalytics(filters?: any) {
      try {
        return await repository.getParentPaymentAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getParentEngagementAnalytics(filters?: any) {
      try {
        return await repository.getParentEngagementAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getParentCommunicationAnalytics(filters?: any) {
      try {
        return await repository.getParentCommunicationAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getParentSatisfactionAnalytics(filters?: any) {
      try {
        return await repository.getParentSatisfactionAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createParentsService(repository: any) { return createParentAnalyticsService(repository); }
export function createParentEngagementService(repository: any) { return createParentAnalyticsService(repository); }
export function createCommunicationService(repository: any) { return createParentAnalyticsService(repository); }
