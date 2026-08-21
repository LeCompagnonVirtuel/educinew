import type { AnalyticsRepository } from '../types';

export function createStudentAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getStudentAnalytics(filters?: any) {
      try {
        return await repository.getStudentAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getEnrollmentAnalytics(filters?: any) {
      try {
        return await repository.getEnrollmentAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getStudentAcademicAnalytics(filters?: any) {
      try {
        return await repository.getStudentAcademicAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getDisciplineAnalytics(filters?: any) {
      try {
        return await repository.getDisciplineAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getHealthAnalytics(filters?: any) {
      try {
        return await repository.getHealthAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getStudentPaymentAnalytics(filters?: any) {
      try {
        return await repository.getStudentPaymentAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getEngagementAnalytics(filters?: any) {
      try {
        return await repository.getEngagementAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getStudentRiskAnalytics(filters?: any) {
      try {
        return await repository.getStudentRiskAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getDropoutPrediction(filters?: any) {
      try {
        return await repository.getDropoutPrediction(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createStudentsService(repository: any) { return createStudentAnalyticsService(repository); }
export function createEnrollmentTrendService(repository: any) { return createStudentAnalyticsService(repository); }
export function createDropoutRiskService(repository: any) { return createStudentAnalyticsService(repository); }
export function createDisciplineService(repository: any) { return createStudentAnalyticsService(repository); }
export function createHealthService(repository: any) { return createStudentAnalyticsService(repository); }
export function createDemographicAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createGenderAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createAgeDistributionService(repository: any) { return createStudentAnalyticsService(repository); }
export function createSocioeconomicAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createLanguageAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createReligionAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createEthnicAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createUrbanRuralAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createIncomeAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createPovertyAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createEducationLevelAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createLiteracyAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
export function createDigitalLiteracyAnalysisService(repository: any) { return createStudentAnalyticsService(repository); }
