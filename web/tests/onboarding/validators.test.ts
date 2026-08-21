import { describe, it, expect } from 'vitest';
import {
  GeneralInfoSchema,
  AdminInfoSchema,
  AcademicConfigSchema,
  PedagogicStructureSchema,
  DirectorSchema,
  ModulesSchema,
  BrandingSchema,
  OnboardingDataSchema,
  CompleteOnboardingSchema,
  SaveDraftSchema,
  OnboardingFiltersSchema,
} from '@/features/onboarding/validators';

describe('Onboarding Validators', () => {
  describe('GeneralInfoSchema', () => {
    it('should validate correct general info', () => {
      const result = GeneralInfoSchema.safeParse({
        name: 'École Test',
        email: 'contact@ecole.com',
      });
      expect(result.success).toBe(true);
    });

    it('should reject short name', () => {
      const result = GeneralInfoSchema.safeParse({
        name: 'A',
        email: 'test@test.com',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const result = GeneralInfoSchema.safeParse({
        name: 'École',
        email: 'invalid',
      });
      expect(result.success).toBe(false);
    });

    it('should accept optional fields', () => {
      const result = GeneralInfoSchema.safeParse({
        name: 'École Test',
        email: 'contact@ecole.com',
        phone: '+22501234567',
        address: '123 Rue',
        city: 'Abidjan',
        country: "Côte d'Ivoire",
      });
      expect(result.success).toBe(true);
    });

    it('should default country to Côte d\'Ivoire', () => {
      const result = GeneralInfoSchema.safeParse({
        name: 'École',
        email: 'test@test.com',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.country).toBe("Côte d'Ivoire");
      }
    });

    it('should reject long name', () => {
      const result = GeneralInfoSchema.safeParse({
        name: 'A'.repeat(201),
        email: 'test@test.com',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('AdminInfoSchema', () => {
    it('should validate correct admin info', () => {
      const result = AdminInfoSchema.safeParse({
        schoolType: 'PRIVE',
        languages: ['fr'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty languages', () => {
      const result = AdminInfoSchema.safeParse({
        schoolType: 'PUBLIC',
        languages: [],
      });
      expect(result.success).toBe(false);
    });

    it('should accept all school types', () => {
      const types = ['PUBLIC', 'PRIVE', 'CONFESSIONNEL', 'TECHNIQUE', 'UNIVERSITE'];
      for (const type of types) {
        const result = AdminInfoSchema.safeParse({
          schoolType: type,
          languages: ['fr'],
        });
        expect(result.success).toBe(true);
      }
    });

    it('should default to XOF currency', () => {
      const result = AdminInfoSchema.safeParse({
        schoolType: 'PRIVE',
        languages: ['fr'],
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.currency).toBe('XOF');
      }
    });

    it('should default to Africa/Abidjan timezone', () => {
      const result = AdminInfoSchema.safeParse({
        schoolType: 'PRIVE',
        languages: ['fr'],
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.timezone).toBe('Africa/Abidjan');
      }
    });
  });

  describe('AcademicConfigSchema', () => {
    it('should validate correct academic config', () => {
      const result = AcademicConfigSchema.safeParse({
        academicYear: '2025-2026',
        yearStartDate: '2025-09-01',
        yearEndDate: '2026-07-15',
      });
      expect(result.success).toBe(true);
    });

    it('should reject end date before start date', () => {
      const result = AcademicConfigSchema.safeParse({
        academicYear: '2025-2026',
        yearStartDate: '2026-07-15',
        yearEndDate: '2025-09-01',
      });
      expect(result.success).toBe(false);
    });

    it('should default grading system to FRENCH_20', () => {
      const result = AcademicConfigSchema.safeParse({
        academicYear: '2025-2026',
        yearStartDate: '2025-09-01',
        yearEndDate: '2026-07-15',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.gradingSystem).toBe('FRENCH_20');
      }
    });

    it('should default passing grade to 10', () => {
      const result = AcademicConfigSchema.safeParse({
        academicYear: '2025-2026',
        yearStartDate: '2025-09-01',
        yearEndDate: '2026-07-15',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.passingGrade).toBe(10);
      }
    });

    it('should accept all grading systems', () => {
      const systems = ['FRENCH_20', 'PERCENTAGE', 'LETTER'];
      for (const system of systems) {
        const result = AcademicConfigSchema.safeParse({
          academicYear: '2025-2026',
          yearStartDate: '2025-09-01',
          yearEndDate: '2026-07-15',
          gradingSystem: system,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('PedagogicStructureSchema', () => {
    it('should validate correct structure', () => {
      const result = PedagogicStructureSchema.safeParse({
        levels: [{
          name: 'CP',
          order: 0,
          sections: [{ name: 'Section A', maxStudents: 40 }],
        }],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty levels', () => {
      const result = PedagogicStructureSchema.safeParse({
        levels: [],
      });
      expect(result.success).toBe(false);
    });

    it('should reject level without sections', () => {
      const result = PedagogicStructureSchema.safeParse({
        levels: [{
          name: 'CP',
          order: 0,
          sections: [],
        }],
      });
      expect(result.success).toBe(false);
    });

    it('should accept multiple levels', () => {
      const result = PedagogicStructureSchema.safeParse({
        levels: [
          { name: 'CP', order: 0, sections: [{ name: 'A', maxStudents: 40 }] },
          { name: 'CE1', order: 1, sections: [{ name: 'A', maxStudents: 40 }] },
          { name: 'CE2', order: 2, sections: [{ name: 'A', maxStudents: 40 }] },
        ],
      });
      expect(result.success).toBe(true);
    });

    it('should default maxStudents to 40', () => {
      const result = PedagogicStructureSchema.safeParse({
        levels: [{
          name: 'CP',
          order: 0,
          sections: [{ name: 'A' }],
        }],
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.levels[0].sections[0].maxStudents).toBe(40);
      }
    });
  });

  describe('DirectorSchema', () => {
    it('should validate correct director', () => {
      const result = DirectorSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@ecole.com',
        password: 'Password123',
      });
      expect(result.success).toBe(true);
    });

    it('should reject short password', () => {
      const result = DirectorSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@ecole.com',
        password: 'Ab1',
      });
      expect(result.success).toBe(false);
    });

    it('should reject password without uppercase', () => {
      const result = DirectorSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@ecole.com',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject password without lowercase', () => {
      const result = DirectorSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@ecole.com',
        password: 'PASSWORD123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject password without number', () => {
      const result = DirectorSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@ecole.com',
        password: 'Password',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const result = DirectorSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'invalid',
        password: 'Password123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ModulesSchema', () => {
    it('should validate with defaults', () => {
      const result = ModulesSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.exams).toBe(true);
        expect(result.data.payments).toBe(false);
        expect(result.data.ai).toBe(false);
      }
    });

    it('should accept all modules enabled', () => {
      const result = ModulesSchema.safeParse({
        payments: true, transport: true, library: true, cafeteria: true,
        health: true, discipline: true, marketplace: true, hr: true,
        gps: true, exams: true, sms: true, ai: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('BrandingSchema', () => {
    it('should validate with defaults', () => {
      const result = BrandingSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.colorPrimary).toBe('#1E40AF');
        expect(result.data.colorSecondary).toBe('#3B82F6');
      }
    });

    it('should accept valid hex colors', () => {
      const result = BrandingSchema.safeParse({
        colorPrimary: '#FF0000',
        colorSecondary: '#00FF00',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      const result = BrandingSchema.safeParse({
        colorPrimary: 'red',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('OnboardingDataSchema', () => {
    it('should validate complete onboarding data', () => {
      const result = OnboardingDataSchema.safeParse({
        generalInfo: { name: 'École', email: 'test@test.com' },
        adminInfo: { schoolType: 'PRIVE', languages: ['fr'] },
        academicConfig: {
          academicYear: '2025-2026',
          yearStartDate: '2025-09-01',
          yearEndDate: '2026-07-15',
        },
        pedagogicStructure: {
          levels: [{ name: 'CP', order: 0, sections: [{ name: 'A', maxStudents: 40 }] }],
        },
        director: { firstName: 'Jean', lastName: 'Dupont', email: 'jean@test.com', password: 'Password123' },
        modules: { exams: true },
        branding: { colorPrimary: '#1E40AF', colorSecondary: '#3B82F6' },
      });
      expect(result.success).toBe(true);
    });
  });

  describe('CompleteOnboardingSchema', () => {
    it('should require CONFIRMER', () => {
      const result = CompleteOnboardingSchema.safeParse({
        onboardingId: '123e4567-e89b-12d3-a456-426614174000',
        confirmation: 'CONFIRMER',
      });
      expect(result.success).toBe(true);
    });

    it('should reject wrong confirmation', () => {
      const result = CompleteOnboardingSchema.safeParse({
        onboardingId: '123e4567-e89b-12d3-a456-426614174000',
        confirmation: 'CONFIRM',
      });
      expect(result.success).toBe(false);
    });

    it('should require valid UUID', () => {
      const result = CompleteOnboardingSchema.safeParse({
        onboardingId: 'invalid',
        confirmation: 'CONFIRMER',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('SaveDraftSchema', () => {
    it('should validate correct draft save', () => {
      const result = SaveDraftSchema.safeParse({
        step: 'general_info',
        data: { name: 'Test' },
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid step', () => {
      const result = SaveDraftSchema.safeParse({
        step: 'invalid_step',
        data: {},
      });
      expect(result.success).toBe(false);
    });
  });

  describe('OnboardingFiltersSchema', () => {
    it('should validate with defaults', () => {
      const result = OnboardingFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it('should validate custom filters', () => {
      const result = OnboardingFiltersSchema.safeParse({
        status: 'IN_PROGRESS',
        page: 2,
        limit: 50,
      });
      expect(result.success).toBe(true);
    });
  });
});
