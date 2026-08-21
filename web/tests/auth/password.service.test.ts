import { describe, it, expect } from 'vitest';
import { PasswordService } from '../../src/features/auth/services/password.service';

describe('PasswordService', () => {
  const service = new PasswordService();

  describe('validate', () => {
    it('accepts valid password', () => {
      expect(service.validate('Test1234')).toEqual([]);
    });
    it('rejects short password', () => {
      const violations = service.validate('Test1');
      expect(violations.some((v) => v.includes('8 caractères'))).toBe(true);
    });
    it('rejects password without uppercase', () => {
      const violations = service.validate('test1234');
      expect(violations.some((v) => v.includes('majuscule'))).toBe(true);
    });
    it('rejects password without lowercase', () => {
      const violations = service.validate('TEST1234');
      expect(violations.some((v) => v.includes('minuscule'))).toBe(true);
    });
    it('rejects password without numbers', () => {
      const violations = service.validate('TestTest');
      expect(violations.some((v) => v.includes('chiffre'))).toBe(true);
    });
  });

  describe('getStrength', () => {
    it('returns Faible for weak password', () => {
      expect(service.getStrength('test')).toEqual({ score: expect.any(Number), label: 'Faible' });
    });
    it('returns Fort for strong password', () => {
      expect(service.getStrength('StrongP@ss123')).toEqual({ score: expect.any(Number), label: 'Fort' });
    });
  });

  describe('generate', () => {
    it('generates password meeting policy', () => {
      const password = service.generate();
      expect(password.length).toBeGreaterThanOrEqual(8);
      expect(service.validate(password)).toEqual([]);
    });
  });
});
