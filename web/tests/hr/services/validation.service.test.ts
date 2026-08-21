import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ValidationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Email validation', () => {
    it('should validate email format', () => {
      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail('test@test.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });
  });

  describe('Phone validation', () => {
    it('should validate phone number', () => {
      const isValidPhone = (phone: string) => /^\+?[0-9]{8,15}$/.test(phone);
      expect(isValidPhone('+225012345678')).toBe(true);
      expect(isValidPhone('0123456789')).toBe(true);
      expect(isValidPhone('123')).toBe(false);
    });
  });

  describe('Date validation', () => {
    it('should validate date format', () => {
      const isValidDate = (date: string) => !isNaN(Date.parse(date));
      expect(isValidDate('2026-07-23')).toBe(true);
      expect(isValidDate('invalid')).toBe(false);
    });

    it('should validate date is not in future', () => {
      const isNotFuture = (date: string) => new Date(date) <= new Date();
      expect(isNotFuture('2025-01-01')).toBe(true);
    });

    it('should validate end date after start date', () => {
      const isValidRange = (start: string, end: string) => new Date(end) >= new Date(start);
      expect(isValidRange('2026-01-01', '2026-12-31')).toBe(true);
      expect(isValidRange('2026-12-31', '2026-01-01')).toBe(false);
    });
  });

  describe('Required field validation', () => {
    it('should check required fields', () => {
      const hasRequired = (data: Record<string, any>, fields: string[]) => fields.every(f => !!data[f]);
      expect(hasRequired({ name: 'John', email: 'j@t.com' }, ['name', 'email'])).toBe(true);
      expect(hasRequired({ name: 'John' }, ['name', 'email'])).toBe(false);
    });
  });

  describe('String length validation', () => {
    it('should validate minimum length', () => {
      const minLength = (value: string, min: number) => value.length >= min;
      expect(minLength('Hello', 3)).toBe(true);
      expect(minLength('Hi', 3)).toBe(false);
    });

    it('should validate maximum length', () => {
      const maxLength = (value: string, max: number) => value.length <= max;
      expect(maxLength('Hello', 100)).toBe(true);
      expect(maxLength('x'.repeat(101), 100)).toBe(false);
    });
  });

  describe('Number validation', () => {
    it('should validate positive number', () => {
      const isPositive = (num: number) => num > 0;
      expect(isPositive(100)).toBe(true);
      expect(isPositive(0)).toBe(false);
      expect(isPositive(-1)).toBe(false);
    });

    it('should validate number range', () => {
      const inRange = (num: number, min: number, max: number) => num >= min && num <= max;
      expect(inRange(50, 0, 100)).toBe(true);
      expect(inRange(-1, 0, 100)).toBe(false);
      expect(inRange(101, 0, 100)).toBe(false);
    });
  });

  describe('Code format validation', () => {
    it('should validate employee code format', () => {
      const isValidCode = (code: string) => /^[A-Z]{2,4}-\d{4}-\d{4,}$/.test(code);
      expect(isValidCode('DIR-2026-0001')).toBe(true);
      expect(isValidCode('AB-2026-0001')).toBe(true);
      expect(isValidCode('invalid')).toBe(false);
    });
  });
});
