import type { AnalyticsRepository } from '../types';

export function createAcademicAnalyticsService(repository: AnalyticsRepository) {
  return {
    async getAcademicAnalytics(filters?: any) {
      try {
        return await repository.getAcademicAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getSuccessRate(filters?: any) {
      try {
        return await repository.getSuccessRate(filters);
      } catch (error) {
        throw error;
      }
    },

    async getGradeEvolution(filters?: any) {
      try {
        return await repository.getGradeEvolution(filters);
      } catch (error) {
        throw error;
      }
    },

    async getAttendanceAnalytics(filters?: any) {
      try {
        return await repository.getAttendanceAnalytics(filters);
      } catch (error) {
        throw error;
      }
    },

    async getPerformanceByClass(filters?: any) {
      try {
        return await repository.getPerformanceByClass(filters);
      } catch (error) {
        throw error;
      }
    },

    async getPerformanceByLevel(filters?: any) {
      try {
        return await repository.getPerformanceByLevel(filters);
      } catch (error) {
        throw error;
      }
    },

    async getPerformanceBySchool(filters?: any) {
      try {
        return await repository.getPerformanceBySchool(filters);
      } catch (error) {
        throw error;
      }
    },

    async getPerformanceByTeacher(filters?: any) {
      try {
        return await repository.getPerformanceByTeacher(filters);
      } catch (error) {
        throw error;
      }
    },

    async getPerformanceByYear(filters?: any) {
      try {
        return await repository.getPerformanceByYear(filters);
      } catch (error) {
        throw error;
      }
    },

    async getSubjectDifficulty(filters?: any) {
      try {
        return await repository.getSubjectDifficulty(filters);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createAcademicService(repository: any) { return createAcademicAnalyticsService(repository); }
export function createSuccessRateService(repository: any) { return createAcademicAnalyticsService(repository); }
export function createGradeEvolutionService(repository: any) { return createAcademicAnalyticsService(repository); }
export function createClassPerformanceService(repository: any) { return createAcademicAnalyticsService(repository); }
export function createSubjectDifficultyService(repository: any) { return createAcademicAnalyticsService(repository); }
