import { describe, it, expect } from 'vitest';
import {
  AuthenticationError,
  AuthorizationError,
  SessionExpiredError,
  InvalidCredentialsError,
  EmailNotVerifiedError,
  PasswordPolicyError,
  TokenExpiredError,
  ForbiddenError,
  AccountLockedError,
  TooManyAttemptsError,
  isAppError,
  toHttpResponse,
} from '@educi/errors';

describe('Auth Errors', () => {
  describe('AuthenticationError', () => {
    it('has correct properties', () => {
      const error = new AuthenticationError();
      expect(error.code).toBe('AUTHENTICATION_ERROR');
      expect(error.statusCode).toBe(401);
      expect(error.isOperational).toBe(true);
      expect(error.message).toBe('Authentification requise');
    });
  });

  describe('InvalidCredentialsError', () => {
    it('has correct properties', () => {
      const error = new InvalidCredentialsError();
      expect(error.code).toBe('INVALID_CREDENTIALS');
      expect(error.statusCode).toBe(401);
    });
  });

  describe('SessionExpiredError', () => {
    it('has correct properties', () => {
      const error = new SessionExpiredError();
      expect(error.code).toBe('SESSION_EXPIRED');
      expect(error.statusCode).toBe(401);
    });
  });

  describe('PasswordPolicyError', () => {
    it('has correct properties', () => {
      const error = new PasswordPolicyError(['Too short', 'No uppercase']);
      expect(error.code).toBe('PASSWORD_POLICY_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.violations).toEqual(['Too short', 'No uppercase']);
    });
  });

  describe('AccountLockedError', () => {
    it('has correct properties', () => {
      const lockedUntil = new Date(Date.now() + 1800000);
      const error = new AccountLockedError(lockedUntil);
      expect(error.code).toBe('ACCOUNT_LOCKED');
      expect(error.statusCode).toBe(423);
      expect(error.lockedUntil).toBe(lockedUntil);
    });
  });

  describe('TooManyAttemptsError', () => {
    it('has correct properties', () => {
      const error = new TooManyAttemptsError(60000);
      expect(error.code).toBe('TOO_MANY_ATTEMPTS');
      expect(error.statusCode).toBe(429);
      expect(error.retryAfterMs).toBe(60000);
    });
  });

  describe('isAppError', () => {
    it('identifies AppError instances', () => {
      expect(isAppError(new AuthenticationError())).toBe(true);
      expect(isAppError(new Error('plain'))).toBe(false);
      expect(isAppError(null)).toBe(false);
    });
  });

  describe('toHttpResponse', () => {
    it('converts AppError to HTTP response', () => {
      const error = new ForbiddenError();
      const response = toHttpResponse(error);
      expect(response.status).toBe(403);
      expect(response.body.error).toBe('FORBIDDEN');
    });
    it('returns 500 for unknown errors', () => {
      const response = toHttpResponse(new Error('unknown'));
      expect(response.status).toBe(500);
    });
  });
});
