import { describe, it, expect } from 'vitest';
import { ValidationService } from '@/features/teachers/services/validation.service';

describe('ValidationService', () => {
  const service = new ValidationService();

  describe('validateCreate', () => {
    it('should validate correct data', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont', employmentType: 'FULL_TIME', contractType: 'CDI' });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch missing firstName', () => {
      const result = service.validateCreate({ firstName: '', lastName: 'Dupont', employmentType: 'FULL_TIME', contractType: 'CDI' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'firstName')).toBe(true);
    });

    it('should catch missing lastName', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: '', employmentType: 'FULL_TIME', contractType: 'CDI' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'lastName')).toBe(true);
    });

    it('should catch missing employmentType', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont', employmentType: '' as any, contractType: 'CDI' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'employmentType')).toBe(true);
    });

    it('should catch missing contractType', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont', employmentType: 'FULL_TIME', contractType: '' as any });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'contractType')).toBe(true);
    });

    it('should catch invalid email', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont', employmentType: 'FULL_TIME', contractType: 'CDI', email: 'invalid' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'email')).toBe(true);
    });

    it('should catch invalid phone', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont', employmentType: 'FULL_TIME', contractType: 'CDI', phone: '123' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'phone')).toBe(true);
    });

    it('should catch negative salary', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont', employmentType: 'FULL_TIME', contractType: 'CDI', salary: -100 });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'salary')).toBe(true);
    });

    it('should catch invalid maxWeeklyHours', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont', employmentType: 'FULL_TIME', contractType: 'CDI', maxWeeklyHours: 100 });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'maxWeeklyHours')).toBe(true);
    });
  });

  describe('validateUpdate', () => {
    it('should validate partial update', () => {
      const result = service.validateUpdate({ firstName: 'Nouveau' });
      expect(result.isValid).toBe(true);
    });

    it('should catch empty firstName in update', () => {
      const result = service.validateUpdate({ firstName: '' });
      expect(result.isValid).toBe(false);
    });

    it('should catch invalid email in update', () => {
      const result = service.validateUpdate({ email: 'invalid' });
      expect(result.isValid).toBe(false);
    });

    it('should allow empty email string in update', () => {
      const result = service.validateUpdate({ email: '' });
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateImportRow', () => {
    it('should validate correct row', () => {
      const result = service.validateImportRow({ firstName: 'Jean', lastName: 'Dupont', employmentType: 'FULL_TIME', contractType: 'CDI' }, 1);
      expect(result.isValid).toBe(true);
    });

    it('should catch missing firstName', () => {
      const result = service.validateImportRow({ lastName: 'Dupont' }, 1);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].row).toBe(1);
    });

    it('should catch missing lastName', () => {
      const result = service.validateImportRow({ firstName: 'Jean' }, 2);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].row).toBe(2);
    });

    it('should catch missing employmentType', () => {
      const result = service.validateImportRow({ firstName: 'Jean', lastName: 'Dupont' }, 1);
      expect(result.isValid).toBe(false);
    });

    it('should support French column names', () => {
      const result = service.validateImportRow({ 'Prénom': 'Jean', 'Nom': 'Dupont', 'Type d\'emploi': 'FULL_TIME', 'Type de contrat': 'CDI' }, 1);
      expect(result.isValid).toBe(true);
    });
  });
});
