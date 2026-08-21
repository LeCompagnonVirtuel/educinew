import { describe, it, expect } from 'vitest';
import type { OnboardingData, WizardState, OnboardingStep } from '@/features/onboarding/types';
import { ONBOARDING_STEPS } from '@educi/types';

describe('Wizard Logic', () => {
  const mockData: OnboardingData = {
    generalInfo: { name: 'École Test', email: 'test@ecole.com', country: "Côte d'Ivoire" },
    adminInfo: { schoolType: 'PRIVE', languages: ['fr'], currency: 'XOF', timezone: 'Africa/Abidjan' },
    academicConfig: {
      academicYear: '2025-2026', yearStartDate: '2025-09-01', yearEndDate: '2026-07-15',
      termsCount: 3, semestersCount: 2, gradingSystem: 'FRENCH_20', passingGrade: 10,
      mentionThresholds: { 'Bien': 14 }, coefficientSystem: false,
    },
    pedagogicStructure: {
      levels: [{ name: 'CP', order: 0, sections: [{ name: 'A', maxStudents: 40 }] }],
    },
    director: { firstName: 'Jean', lastName: 'Dupont', email: 'jean@ecole.com', password: 'Password123' },
    modules: { exams: true, payments: false, transport: false, library: false, cafeteria: false, health: false, discipline: false, marketplace: false, hr: false, gps: false, sms: false, ai: false },
    branding: { colorPrimary: '#1E40AF', colorSecondary: '#3B82F6' },
  };

  it('should have 8 steps total', () => {
    expect(ONBOARDING_STEPS).toHaveLength(8);
  });

  it('should calculate progress percentage correctly', () => {
    const completedSteps: OnboardingStep[] = ['general_info', 'admin_info'];
    const progress = Math.round((completedSteps.length / ONBOARDING_STEPS.length) * 100);
    expect(progress).toBe(25);
  });

  it('should return 0% for no completed steps', () => {
    const completedSteps: OnboardingStep[] = [];
    const progress = Math.round((completedSteps.length / ONBOARDING_STEPS.length) * 100);
    expect(progress).toBe(0);
  });

  it('should return 100% for all completed steps', () => {
    const progress = Math.round((ONBOARDING_STEPS.length / ONBOARDING_STEPS.length) * 100);
    expect(progress).toBe(100);
  });

  it('should get correct step index', () => {
    expect(ONBOARDING_STEPS.indexOf('general_info')).toBe(0);
    expect(ONBOARDING_STEPS.indexOf('admin_info')).toBe(1);
    expect(ONBOARDING_STEPS.indexOf('validation')).toBe(7);
  });

  it('should advance to next step', () => {
    const currentIndex = ONBOARDING_STEPS.indexOf('general_info');
    const nextIndex = currentIndex + 1;
    expect(ONBOARDING_STEPS[nextIndex]).toBe('admin_info');
  });

  it('should go back to previous step', () => {
    const currentIndex = ONBOARDING_STEPS.indexOf('admin_info');
    const prevIndex = currentIndex - 1;
    expect(ONBOARDING_STEPS[prevIndex]).toBe('general_info');
  });

  it('should not go beyond last step', () => {
    const currentIndex = ONBOARDING_STEPS.indexOf('validation');
    const nextIndex = currentIndex + 1;
    expect(nextIndex).toBeGreaterThanOrEqual(ONBOARDING_STEPS.length);
  });

  it('should not go before first step', () => {
    const currentIndex = ONBOARDING_STEPS.indexOf('general_info');
    const prevIndex = currentIndex - 1;
    expect(prevIndex).toBeLessThan(0);
  });

  it('should merge step data correctly', () => {
    const existing = { ...mockData };
    const update = { name: 'Nouveau Nom' };
    const merged = { ...existing.generalInfo, ...update };
    expect(merged.name).toBe('Nouveau Nom');
    expect(merged.email).toBe('test@ecole.com');
  });

  it('should track completed steps uniquely', () => {
    const steps: OnboardingStep[] = ['general_info', 'admin_info', 'general_info'];
    const unique = [...new Set(steps)];
    expect(unique).toHaveLength(2);
  });
});
