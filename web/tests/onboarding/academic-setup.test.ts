import { describe, it, expect } from 'vitest';
import { AcademicSetupService } from '@/features/onboarding/services/academic-setup.service';
import type { OnboardingData } from '@/features/onboarding/types';

describe('AcademicSetupService', () => {
  const service = new AcademicSetupService();

  const mockData: OnboardingData = {
    generalInfo: { name: 'École', email: 'test@test.com', country: "Côte d'Ivoire" },
    adminInfo: { schoolType: 'PRIVE', languages: ['fr'], currency: 'XOF', timezone: 'Africa/Abidjan' },
    academicConfig: {
      academicYear: '2025-2026',
      yearStartDate: '2025-09-01',
      yearEndDate: '2026-07-15',
      termsCount: 3,
      semestersCount: 2,
      gradingSystem: 'FRENCH_20',
      passingGrade: 10,
      mentionThresholds: { 'Bien': 14 },
      coefficientSystem: false,
    },
    pedagogicStructure: {
      levels: [
        { name: 'CP', order: 0, sections: [{ name: 'A', maxStudents: 40 }, { name: 'B', maxStudents: 35 }] },
        { name: 'CE1', order: 1, sections: [{ name: 'A', maxStudents: 40 }] },
      ],
    },
    director: { firstName: 'Jean', lastName: 'Dupont', email: 'jean@test.com', password: 'Password123' },
    modules: { exams: true, payments: false, transport: false, library: false, cafeteria: false, health: false, discipline: false, marketplace: false, hr: false, gps: false, sms: false, ai: false },
    branding: { colorPrimary: '#1E40AF', colorSecondary: '#3B82F6' },
  };

  it('should build academic setup from data', () => {
    const setup = service.buildAcademicSetup(mockData);
    expect(setup.academicYear).toBe('2025-2026');
    expect(setup.yearStartDate).toBe('2025-09-01');
    expect(setup.yearEndDate).toBe('2026-07-15');
    expect(setup.termsCount).toBe(3);
    expect(setup.gradingSystem).toBe('FRENCH_20');
    expect(setup.passingGrade).toBe(10);
  });

  it('should include levels and sections', () => {
    const setup = service.buildAcademicSetup(mockData);
    expect(setup.levels).toHaveLength(2);
    expect(setup.levels[0].name).toBe('CP');
    expect(setup.levels[0].sections).toHaveLength(2);
    expect(setup.levels[1].name).toBe('CE1');
  });

  it('should return default academic setup', () => {
    const setup = service.getDefaultAcademicSetup();
    expect(setup.academicYear).toBeDefined();
    expect(setup.gradingSystem).toBe('FRENCH_20');
    expect(setup.passingGrade).toBe(10);
    expect(setup.levels).toHaveLength(0);
  });

  it('should validate year dates correctly', () => {
    expect(service.validateYearDates('2025-09-01', '2026-07-15')).toBe(true);
    expect(service.validateYearDates('2026-07-15', '2025-09-01')).toBe(false);
    expect(service.validateYearDates('2025-09-01', '2025-09-01')).toBe(false);
  });

  it('should generate term dates', () => {
    const terms = service.generateTermDates('2025-09-01', '2026-07-15', 3);
    expect(terms).toHaveLength(3);
    expect(terms[0].name).toBe('Trimestre 1');
    expect(terms[1].name).toBe('Trimestre 2');
    expect(terms[2].name).toBe('Trimestre 3');
  });

  it('should generate 2 terms correctly', () => {
    const terms = service.generateTermDates('2025-09-01', '2026-07-15', 2);
    expect(terms).toHaveLength(2);
  });
});
