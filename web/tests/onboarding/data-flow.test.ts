import { describe, it, expect } from 'vitest';
import type { OnboardingData } from '@/features/onboarding/types';

describe('Onboarding Data Flow', () => {
  const fullData: OnboardingData = {
    generalInfo: {
      name: 'École Excellence',
      code: 'EXC',
      phone: '+22501234567',
      email: 'contact@excellence.com',
      address: '123 Avenue de la Paix',
      city: 'Abidjan',
      region: 'Lagunes',
      country: "Côte d'Ivoire",
      latitude: 5.36,
      longitude: -4.01,
    },
    adminInfo: {
      schoolType: 'PRIVE',
      foundingDate: '2020-01-01',
      languages: ['fr', 'en'],
      currency: 'XOF',
      timezone: 'Africa/Abidjan',
    },
    academicConfig: {
      academicYear: '2025-2026',
      yearStartDate: '2025-09-01',
      yearEndDate: '2026-07-15',
      termsCount: 3,
      semestersCount: 2,
      gradingSystem: 'FRENCH_20',
      passingGrade: 10,
      mentionThresholds: { 'Bien': 14, 'Très Bien': 16, 'Excellent': 18 },
      coefficientSystem: true,
    },
    pedagogicStructure: {
      levels: [
        {
          name: 'Maternelle',
          order: 0,
          sections: [
            { name: 'Petite Section', maxStudents: 25 },
            { name: 'Moyenne Section', maxStudents: 25 },
            { name: 'Grande Section', maxStudents: 30 },
          ],
        },
        {
          name: 'Primaire',
          order: 1,
          sections: [
            { name: 'CP', series: ['A', 'B'], maxStudents: 40 },
            { name: 'CE1', series: ['A', 'B'], maxStudents: 40 },
            { name: 'CE2', series: ['A'], maxStudents: 35 },
            { name: 'CM1', series: ['A', 'B'], maxStudents: 40 },
            { name: 'CM2', series: ['A'], maxStudents: 35 },
          ],
        },
      ],
    },
    director: {
      firstName: 'Kouakou',
      lastName: 'Asseh',
      email: 'kouakou@excellence.com',
      phone: '+22507070707',
      password: 'SecurePass123',
    },
    modules: {
      payments: true,
      transport: true,
      library: false,
      cafeteria: false,
      health: false,
      discipline: true,
      marketplace: false,
      hr: false,
      gps: true,
      exams: true,
      sms: true,
      ai: false,
    },
    branding: {
      colorPrimary: '#1E3A8A',
      colorSecondary: '#60A5FA',
      fontPrimary: 'Inter',
      shortName: 'EXC',
      slogan: 'L\'excellence à portée de main',
    },
  };

  it('should contain all required top-level keys', () => {
    expect(fullData).toHaveProperty('generalInfo');
    expect(fullData).toHaveProperty('adminInfo');
    expect(fullData).toHaveProperty('academicConfig');
    expect(fullData).toHaveProperty('pedagogicStructure');
    expect(fullData).toHaveProperty('director');
    expect(fullData).toHaveProperty('modules');
    expect(fullData).toHaveProperty('branding');
  });

  it('should have correct generalInfo fields', () => {
    expect(fullData.generalInfo.name).toBe('École Excellence');
    expect(fullData.generalInfo.email).toBe('contact@excellence.com');
    expect(fullData.generalInfo.city).toBe('Abidjan');
    expect(fullData.generalInfo.country).toBe("Côte d'Ivoire");
  });

  it('should have correct adminInfo fields', () => {
    expect(fullData.adminInfo.schoolType).toBe('PRIVE');
    expect(fullData.adminInfo.languages).toContain('fr');
    expect(fullData.adminInfo.currency).toBe('XOF');
  });

  it('should have correct academicConfig', () => {
    expect(fullData.academicConfig.academicYear).toBe('2025-2026');
    expect(fullData.academicConfig.gradingSystem).toBe('FRENCH_20');
    expect(fullData.academicConfig.termsCount).toBe(3);
  });

  it('should have multiple levels with sections', () => {
    expect(fullData.pedagogicStructure.levels).toHaveLength(2);
    expect(fullData.pedagogicStructure.levels[0].sections).toHaveLength(3);
    expect(fullData.pedagogicStructure.levels[1].sections).toHaveLength(5);
  });

  it('should have director info', () => {
    expect(fullData.director.firstName).toBe('Kouakou');
    expect(fullData.director.lastName).toBe('Asseh');
    expect(fullData.director.email).toBe('kouakou@excellence.com');
  });

  it('should have modules configuration', () => {
    expect(fullData.modules.payments).toBe(true);
    expect(fullData.modules.transport).toBe(true);
    expect(fullData.modules.exams).toBe(true);
    expect(fullData.modules.library).toBe(false);
  });

  it('should have branding configuration', () => {
    expect(fullData.branding.colorPrimary).toBe('#1E3A8A');
    expect(fullData.branding.colorSecondary).toBe('#60A5FA');
    expect(fullData.branding.shortName).toBe('EXC');
  });

  it('should be serializable to JSON', () => {
    const json = JSON.stringify(fullData);
    const parsed = JSON.parse(json);
    expect(parsed.generalInfo.name).toBe('École Excellence');
    expect(parsed.director.firstName).toBe('Kouakou');
  });

  it('should count total levels and sections', () => {
    let totalSections = 0;
    for (const level of fullData.pedagogicStructure.levels) {
      totalSections += level.sections.length;
    }
    expect(totalSections).toBe(8);
  });

  it('should count enabled modules', () => {
    const enabledCount = Object.values(fullData.modules).filter(Boolean).length;
    expect(enabledCount).toBe(6);
  });
});
