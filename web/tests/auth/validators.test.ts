import { describe, it, expect } from 'vitest';
import {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  ChangePasswordSchema,
  VerifyEmailSchema,
  InvitationSchema,
  MFAVerifySchema,
  FirstLoginSchema,
} from '../../src/features/auth/validators/schemas';

describe('Auth Validators', () => {
  describe('LoginSchema', () => {
    it('accepts valid login', () => {
      expect(LoginSchema.safeParse({ identifier: 'user@test.com', password: 'pass123' })).toHaveProperty('success', true);
    });
    it('rejects empty identifier', () => {
      expect(LoginSchema.safeParse({ identifier: '', password: 'pass123' })).toHaveProperty('success', false);
    });
    it('rejects empty password', () => {
      expect(LoginSchema.safeParse({ identifier: 'user@test.com', password: '' })).toHaveProperty('success', false);
    });
  });

  describe('RegisterSchema', () => {
    it('accepts valid registration', () => {
      const result = RegisterSchema.safeParse({
        email: 'test@test.com',
        password: 'Test1234',
        confirmPassword: 'Test1234',
        name: 'John Doe',
      });
      expect(result.success).toBe(true);
    });
    it('rejects mismatched passwords', () => {
      const result = RegisterSchema.safeParse({
        email: 'test@test.com',
        password: 'Test1234',
        confirmPassword: 'Different1234',
        name: 'John Doe',
      });
      expect(result.success).toBe(false);
    });
    it('rejects weak password', () => {
      const result = RegisterSchema.safeParse({
        email: 'test@test.com',
        password: 'weak',
        confirmPassword: 'weak',
        name: 'John Doe',
      });
      expect(result.success).toBe(false);
    });
    it('rejects invalid email', () => {
      const result = RegisterSchema.safeParse({
        email: 'not-an-email',
        password: 'Test1234',
        confirmPassword: 'Test1234',
        name: 'John Doe',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ForgotPasswordSchema', () => {
    it('accepts valid email', () => {
      expect(ForgotPasswordSchema.safeParse({ email: 'test@test.com' })).toHaveProperty('success', true);
    });
    it('rejects invalid email', () => {
      expect(ForgotPasswordSchema.safeParse({ email: 'invalid' })).toHaveProperty('success', false);
    });
  });

  describe('ResetPasswordSchema', () => {
    it('accepts valid reset', () => {
      const result = ResetPasswordSchema.safeParse({
        token: 'abc123',
        newPassword: 'NewPass123',
        confirmPassword: 'NewPass123',
      });
      expect(result.success).toBe(true);
    });
    it('rejects mismatched passwords', () => {
      const result = ResetPasswordSchema.safeParse({
        token: 'abc123',
        newPassword: 'NewPass123',
        confirmPassword: 'Different123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ChangePasswordSchema', () => {
    it('accepts valid change', () => {
      const result = ChangePasswordSchema.safeParse({
        currentPassword: 'OldPass123',
        newPassword: 'NewPass123',
        confirmPassword: 'NewPass123',
      });
      expect(result.success).toBe(true);
    });
    it('rejects same password', () => {
      const result = ChangePasswordSchema.safeParse({
        currentPassword: 'SamePass123',
        newPassword: 'SamePass123',
        confirmPassword: 'SamePass123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('VerifyEmailSchema', () => {
    it('accepts valid token', () => {
      expect(VerifyEmailSchema.safeParse({ token: 'abc123' })).toHaveProperty('success', true);
    });
    it('rejects empty token', () => {
      expect(VerifyEmailSchema.safeParse({ token: '' })).toHaveProperty('success', false);
    });
  });

  describe('InvitationSchema', () => {
    it('accepts valid invitation', () => {
      const result = InvitationSchema.safeParse({
        email: 'test@test.com',
        role: 'TEACHER',
        schoolId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
    });
    it('rejects invalid role', () => {
      const result = InvitationSchema.safeParse({
        email: 'test@test.com',
        role: 'INVALID_ROLE',
        schoolId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('MFAVerifySchema', () => {
    it('accepts valid 6-digit code', () => {
      expect(MFAVerifySchema.safeParse({ code: '123456' })).toHaveProperty('success', true);
    });
    it('rejects non-numeric code', () => {
      expect(MFAVerifySchema.safeParse({ code: 'abcdef' })).toHaveProperty('success', false);
    });
    it('rejects short code', () => {
      expect(MFAVerifySchema.safeParse({ code: '12345' })).toHaveProperty('success', false);
    });
  });

  describe('FirstLoginSchema', () => {
    it('accepts valid first login', () => {
      const result = FirstLoginSchema.safeParse({
        newPassword: 'NewPass123',
        confirmPassword: 'NewPass123',
        acceptTerms: true,
      });
      expect(result.success).toBe(true);
    });
    it('rejects when terms not accepted', () => {
      const result = FirstLoginSchema.safeParse({
        newPassword: 'NewPass123',
        confirmPassword: 'NewPass123',
        acceptTerms: false,
      });
      expect(result.success).toBe(false);
    });
  });
});
