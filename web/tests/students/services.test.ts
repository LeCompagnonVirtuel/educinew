import { describe, it, expect } from 'vitest';
import { ValidationService } from '@/features/students/services/validation.service';

describe('ValidationService', () => {
  const service = new ValidationService();

  describe('validateCreate', () => {
    it('should validate correct data', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont' });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch missing firstName', () => {
      const result = service.validateCreate({ firstName: '', lastName: 'Dupont' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'firstName')).toBe(true);
    });

    it('should catch missing lastName', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'lastName')).toBe(true);
    });

    it('should catch invalid email', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont', email: 'invalid' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'email')).toBe(true);
    });

    it('should catch invalid phone', () => {
      const result = service.validateCreate({ firstName: 'Jean', lastName: 'Dupont', phone: '123' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'phone')).toBe(true);
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
  });

  describe('validateImportRow', () => {
    it('should validate correct row', () => {
      const result = service.validateImportRow({ firstName: 'Jean', lastName: 'Dupont' }, 1);
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

    it('should support French column names', () => {
      const result = service.validateImportRow({ 'Prénom': 'Jean', 'Nom': 'Dupont' }, 1);
      expect(result.isValid).toBe(true);
    });
  });
});
