import { describe, it, expect } from 'vitest';
import {
  CreateSchoolSchema,
  UpdateSchoolSchema,
  SchoolSettingsSchema,
  UploadLogoSchema,
  ArchiveSchoolSchema,
  DeleteSchoolSchema,
  SlugSchema,
  SchoolFiltersSchema,
} from '@/features/schools/validators';

describe('School Validators', () => {
  describe('CreateSchoolSchema', () => {
    it('should validate correct school creation data', () => {
      const data = {
        name: 'École Test',
        email: 'contact@ecole-test.com',
      };
      const result = CreateSchoolSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject short name', () => {
      const data = { name: 'A', email: 'test@test.com' };
      const result = CreateSchoolSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const data = { name: 'École', email: 'invalid' };
      const result = CreateSchoolSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should accept optional fields', () => {
      const data = {
        name: 'École Test',
        email: 'contact@ecole-test.com',
        phone: '+22501234567',
        address: '123 Rue Test',
        city: 'Abidjan',
        country: "Côte d'Ivoire",
        plan: 'STARTER',
      };
      const result = CreateSchoolSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should default to FREE plan', () => {
      const data = { name: 'École', email: 'test@test.com' };
      const result = CreateSchoolSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.plan).toBe('FREE');
      }
    });
  });

  describe('UpdateSchoolSchema', () => {
    it('should validate partial update data', () => {
      const data = { name: 'Nouveau Nom' };
      const result = UpdateSchoolSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty update', () => {
      const data = {};
      const result = UpdateSchoolSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should validate color codes', () => {
      const data = { primaryColor: '#FF0000' };
      const result = UpdateSchoolSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid color codes', () => {
      const data = { primaryColor: 'red' };
      const result = UpdateSchoolSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should validate coordinates', () => {
      const data = { latitude: 5.3600, longitude: -4.0083 };
      const result = UpdateSchoolSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid latitude', () => {
      const data = { latitude: 100 };
      const result = UpdateSchoolSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('SchoolSettingsSchema', () => {
    it('should validate with defaults', () => {
      const data = {};
      const result = SchoolSettingsSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.language).toBe('fr');
        expect(result.data.timezone).toBe('Africa/Abidjan');
        expect(result.data.currency).toBe('XOF');
      }
    });

    it('should validate custom settings', () => {
      const data = {
        language: 'en',
        timezone: 'Europe/Paris',
        currency: 'EUR',
        gradingSystem: '100',
        passingGrade: 50,
      };
      const result = SchoolSettingsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('DeleteSchoolSchema', () => {
    it('should require SUPPRIMER confirmation', () => {
      const data = { schoolId: '123e4567-e89b-12d3-a456-426614174000', confirmation: 'SUPPRIMER' };
      const result = DeleteSchoolSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject wrong confirmation', () => {
      const data = { schoolId: '123e4567-e89b-12d3-a456-426614174000', confirmation: 'DELETE' };
      const result = DeleteSchoolSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should require valid UUID', () => {
      const data = { schoolId: 'invalid', confirmation: 'SUPPRIMER' };
      const result = DeleteSchoolSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('SlugSchema', () => {
    it('should validate correct slug input', () => {
      const data = { name: 'École Test' };
      const result = SlugSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject short name', () => {
      const data = { name: 'A' };
      const result = SlugSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('SchoolFiltersSchema', () => {
    it('should validate with defaults', () => {
      const data = {};
      const result = SchoolFiltersSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('ALL');
        expect(result.data.plan).toBe('ALL');
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it('should validate custom filters', () => {
      const data = {
        search: 'test',
        status: 'ACTIVE',
        plan: 'PRO',
        page: 2,
        limit: 50,
      };
      const result = SchoolFiltersSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
