import type { OnboardingData, AcademicSetupConfig } from '../types';
import { logger } from '@educi/logger';

export class AcademicSetupService {
  buildAcademicSetup(data: OnboardingData): AcademicSetupConfig {
    return {
      academicYear: data.academicConfig.academicYear,
      yearStartDate: data.academicConfig.yearStartDate,
      yearEndDate: data.academicConfig.yearEndDate,
      termsCount: data.academicConfig.termsCount,
      semestersCount: data.academicConfig.semestersCount,
      gradingSystem: data.academicConfig.gradingSystem,
      passingGrade: data.academicConfig.passingGrade,
      levels: data.pedagogicStructure.levels.map((level) => ({
        name: level.name,
        order: level.order,
        sections: level.sections.map((section) => ({
          name: section.name,
          maxStudents: section.maxStudents || 40,
        })),
      })),
    };
  }

  getDefaultAcademicSetup(): AcademicSetupConfig {
    const year = new Date().getFullYear();
    return {
      academicYear: `${year}-${year + 1}`,
      yearStartDate: `${year}-09-01`,
      yearEndDate: `${year + 1}-07-15`,
      termsCount: 3,
      semestersCount: 2,
      gradingSystem: 'FRENCH_20',
      passingGrade: 10,
      levels: [],
    };
  }

  validateYearDates(startDate: string, endDate: string): boolean {
    return new Date(startDate) < new Date(endDate);
  }

  generateTermDates(startDate: string, endDate: string, termsCount: number): Array<{ name: string; start: string; end: string }> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysPerTerm = Math.floor(totalDays / termsCount);

    const terms: Array<{ name: string; start: string; end: string }> = [];
    for (let i = 0; i < termsCount; i++) {
      const termStart = new Date(start.getTime() + i * daysPerTerm * 24 * 60 * 60 * 1000);
      const termEnd = new Date(start.getTime() + (i + 1) * daysPerTerm * 24 * 60 * 60 * 1000);
      terms.push({
        name: `Trimestre ${i + 1}`,
        start: termStart.toISOString().split('T')[0],
        end: termEnd.toISOString().split('T')[0],
      });
    }

    logger.info('Term dates generated', { termsCount, terms }, 'onboarding');
    return terms;
  }
}
