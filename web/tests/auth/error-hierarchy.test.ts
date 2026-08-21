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
  AppError,
} from '@educi/errors';

describe('Error Hierarchy', () => {
  it('all auth errors extend AppError', () => {
    expect(new AuthenticationError()).toBeInstanceOf(AppError);
    expect(new AuthorizationError()).toBeInstanceOf(AppError);
    expect(new SessionExpiredError()).toBeInstanceOf(AppError);
    expect(new InvalidCredentialsError()).toBeInstanceOf(AppError);
    expect(new EmailNotVerifiedError()).toBeInstanceOf(AppError);
    expect(new PasswordPolicyError([])).toBeInstanceOf(AppError);
    expect(new TokenExpiredError()).toBeInstanceOf(AppError);
    expect(new ForbiddenError()).toBeInstanceOf(AppError);
    expect(new AccountLockedError(new Date())).toBeInstanceOf(AppError);
    expect(new TooManyAttemptsError(60000)).toBeInstanceOf(AppError);
  });

  it('all auth errors have correct HTTP status codes', () => {
    expect(new AuthenticationError().statusCode).toBe(401);
    expect(new AuthorizationError().statusCode).toBe(403);
    expect(new SessionExpiredError().statusCode).toBe(401);
    expect(new InvalidCredentialsError().statusCode).toBe(401);
    expect(new EmailNotVerifiedError().statusCode).toBe(403);
    expect(new PasswordPolicyError([]).statusCode).toBe(400);
    expect(new TokenExpiredError().statusCode).toBe(401);
    expect(new ForbiddenError().statusCode).toBe(403);
    expect(new AccountLockedError(new Date()).statusCode).toBe(423);
    expect(new TooManyAttemptsError(60000).statusCode).toBe(429);
  });

  it('PasswordPolicyError contains violations', () => {
    const error = new PasswordPolicyError(['Too short', 'No numbers']);
    expect(error.violations).toEqual(['Too short', 'No numbers']);
    expect(error.code).toBe('PASSWORD_POLICY_ERROR');
  });

  it('AccountLockedError contains lockedUntil', () => {
    const lockedUntil = new Date('2026-12-31');
    const error = new AccountLockedError(lockedUntil);
    expect(error.lockedUntil).toBe(lockedUntil);
    expect(error.code).toBe('ACCOUNT_LOCKED');
  });

  it('TooManyAttemptsError contains retryAfterMs', () => {
    const error = new TooManyAttemptsError(30000);
    expect(error.retryAfterMs).toBe(30000);
    expect(error.code).toBe('TOO_MANY_ATTEMPTS');
  });
});
