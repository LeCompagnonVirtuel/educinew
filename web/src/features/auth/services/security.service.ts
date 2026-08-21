import { AUTH } from '@educi/config';
import { TooManyAttemptsError, AccountLockedError } from '@educi/errors';
import { logger } from '@educi/logger';

interface LoginAttempt {
  count: number;
  firstAttemptAt: number;
  lastAttemptAt: number;
  lockedUntil?: Date;
}

export class SecurityService {
  private attempts = new Map<string, LoginAttempt>();

  async checkLoginAttempts(identifier: string): Promise<void> {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return;

    if (attempt.lockedUntil && attempt.lockedUntil > new Date()) {
      logger.security('Locked account login attempt', { identifier }, 'security');
      throw new AccountLockedError(attempt.lockedUntil);
    }

    if (attempt.lockedUntil && attempt.lockedUntil <= new Date()) {
      this.attempts.delete(identifier);
      return;
    }

    const windowMs = AUTH.RATE_LIMIT.LOGIN.windowMs;
    if (Date.now() - attempt.firstAttemptAt > windowMs) {
      this.attempts.delete(identifier);
      return;
    }
  }

  async recordFailedLogin(identifier: string): Promise<void> {
    const attempt = this.attempts.get(identifier);
    if (!attempt) {
      this.attempts.set(identifier, {
        count: 1,
        firstAttemptAt: Date.now(),
        lastAttemptAt: Date.now(),
      });
      return;
    }

    const windowMs = AUTH.RATE_LIMIT.LOGIN.windowMs;
    if (Date.now() - attempt.firstAttemptAt > windowMs) {
      this.attempts.set(identifier, {
        count: 1,
        firstAttemptAt: Date.now(),
        lastAttemptAt: Date.now(),
      });
      return;
    }

    attempt.count++;
    attempt.lastAttemptAt = Date.now();

    if (attempt.count >= AUTH.RATE_LIMIT.LOGIN.max && !attempt.lockedUntil) {
      const lockoutMs = AUTH.LOCKOUT_DURATION_MINUTES * 60 * 1000;
      attempt.lockedUntil = new Date(Date.now() + lockoutMs);
    }
  }

  async recordSuccessfulLogin(identifier: string): Promise<void> {
    this.attempts.delete(identifier);
  }

  getRemainingAttempts(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return AUTH.RATE_LIMIT.LOGIN.max;
    return Math.max(0, AUTH.RATE_LIMIT.LOGIN.max - attempt.count);
  }

  isLocked(identifier: string): boolean {
    const attempt = this.attempts.get(identifier);
    if (!attempt?.lockedUntil) return false;
    return attempt.lockedUntil > new Date();
  }

  getLockoutTimeRemaining(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt?.lockedUntil) return 0;
    return Math.max(0, attempt.lockedUntil.getTime() - Date.now());
  }
}
