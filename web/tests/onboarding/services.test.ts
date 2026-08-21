import { describe, it, expect } from 'vitest';
import type { OnboardingData } from '@/features/onboarding/types';
import { ValidationService } from '@/features/onboarding/services/validation.service';

describe('ValidationService', () => {
  const service = new ValidationService();

  const validData: OnboardingData = {
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

  describe('validateStep', () => {
    it('should validate general_info step', () => {
      const result = service.validateStep('general_info', validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch general_info errors', () => {
      const data = { ...validData, generalInfo: { name: '', email: '' } };
      const result = service.validateStep('general_info', data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate admin_info step', () => {
      const result = service.validateStep('admin_info', validData);
      expect(result.isValid).toBe(true);
    });

    it('should validate academic_config step', () => {
      const result = service.validateStep('academic_config', validData);
      expect(result.isValid).toBe(true);
    });

    it('should validate pedagogic_structure step', () => {
      const result = service.validateStep('pedagogic_structure', validData);
      expect(result.isValid).toBe(true);
    });

    it('should validate director_creation step', () => {
      const result = service.validateStep('director_creation', validData);
      expect(result.isValid).toBe(true);
    });

    it('should validate modules step', () => {
      const result = service.validateStep('modules', validData);
      expect(result.isValid).toBe(true);
    });

    it('should validate branding step', () => {
      const result = service.validateStep('branding', validData);
      expect(result.isValid).toBe(true);
    });

    it('should validate validation step (all)', () => {
      const result = service.validateStep('validation', validData);
      expect(result.isValid).toBe(true);
    });

    it('should catch director errors', () => {
      const data = { ...validData, director: { firstName: '', lastName: '', email: '', password: 'weak' } };
      const result = service.validateStep('director_creation', data);
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateAll', () => {
    it('should validate complete valid data', () => {
      const result = service.validateAll(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch all errors in invalid data', () => {
      const data = {
        generalInfo: { name: '', email: '' },
        adminInfo: { schoolType: 'PRIVE', languages: [] },
        academicConfig: {
          academicYear: '', yearStartDate: '', yearEndDate: '',
          termsCount: 3, semestersCount: 2, gradingSystem: 'FRENCH_20', passingGrade: 10,
          mentionThresholds: {}, coefficientSystem: false,
        },
        pedagogicStructure: { levels: [] },
        director: { firstName: '', lastName: '', email: '', password: '' },
        modules: { exams: false, payments: false, transport: false, library: false, cafeteria: false, health: false, discipline: false, marketplace: false, hr: false, gps: false, sms: false, ai: false },
        branding: { colorPrimary: '#1E40AF', colorSecondary: '#3B82F6' },
      } as OnboardingData;
      const result = service.validateAll(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(5);
    });
  });

  describe('individual validators', () => {
    it('validateGeneralInfo should work', () => {
      const result = service.validateGeneralInfo(validData.generalInfo);
      expect(result.isValid).toBe(true);
    });

    it('validateAdminInfo should work', () => {
      const result = service.validateAdminInfo(validData.adminInfo);
      expect(result.isValid).toBe(true);
    });

    it('validateAcademicConfig should work', () => {
      const result = service.validateAcademicConfig(validData.academicConfig);
      expect(result.isValid).toBe(true);
    });

    it('validateDirector should work', () => {
      const result = service.validateDirector(validData.director);
      expect(result.isValid).toBe(true);
    });
  });
});
