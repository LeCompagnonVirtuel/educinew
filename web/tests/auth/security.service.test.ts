import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SecurityService } from '../../src/features/auth/services/security.service';

describe('SecurityService', () => {
  let service: SecurityService;

  beforeEach(() => {
    service = new SecurityService();
  });

  describe('checkLoginAttempts', () => {
    it('allows first login attempt', async () => {
      await expect(service.checkLoginAttempts('test@test.com')).resolves.toBeUndefined();
    });

    it('tracks failed attempts', async () => {
      await service.recordFailedLogin('test@test.com');
      await service.recordFailedLogin('test@test.com');
      expect(service.getRemainingAttempts('test@test.com')).toBe(3);
    });

    it('locks account after max attempts', async () => {
      for (let i = 0; i < 5; i++) {
        await service.recordFailedLogin('test@test.com');
      }
      expect(service.getRemainingAttempts('test@test.com')).toBe(0);
    });

    it('clears attempts on successful login', async () => {
      await service.recordFailedLogin('test@test.com');
      await service.recordFailedLogin('test@test.com');
      await service.recordSuccessfulLogin('test@test.com');
      expect(service.getRemainingAttempts('test@test.com')).toBe(5);
    });
  });

  describe('isLocked', () => {
    it('returns false for unknown identifier', () => {
      expect(service.isLocked('unknown@test.com')).toBe(false);
    });
  });

  describe('getLockoutTimeRemaining', () => {
    it('returns 0 for unlocked identifier', () => {
      expect(service.getLockoutTimeRemaining('test@test.com')).toBe(0);
    });
  });
});
