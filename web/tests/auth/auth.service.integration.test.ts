import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../../src/features/auth/services/auth.service';
import { PasswordService } from '../../src/features/auth/services/password.service';
import { SessionService } from '../../src/features/auth/services/session.service';
import { AuditService } from '../../src/features/auth/services/audit.service';
import { SecurityService } from '../../src/features/auth/services/security.service';
import { EmailVerificationService } from '../../src/features/auth/services/email-verification.service';
import { AuthenticationError, InvalidCredentialsError } from '@educi/errors';

function createMockAuthRepo() {
  return {
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    getSession: vi.fn(),
    getUser: vi.fn(),
    refreshSession: vi.fn(),
    resetPassword: vi.fn(),
    updateUserPassword: vi.fn(),
    verifyEmail: vi.fn(),
    resolveIdentifier: vi.fn(),
  };
}

function createMockAuditRepo() {
  return {
    log: vi.fn(),
    getEvents: vi.fn(),
  };
}

describe('AuthService Integration', () => {
  let authService: AuthService;
  let authRepo: ReturnType<typeof createMockAuthRepo>;
  let auditRepo: ReturnType<typeof createMockAuditRepo>;

  beforeEach(() => {
    authRepo = createMockAuthRepo();
    auditRepo = createMockAuditRepo();
    const passwordService = new PasswordService();
    const sessionService = new SessionService(authRepo as any);
    const auditService = new AuditService(auditRepo as any);
    const securityService = new SecurityService();
    const emailVerificationService = new EmailVerificationService();

    authService = new AuthService(
      authRepo as any,
      passwordService,
      sessionService,
      auditService,
      securityService,
      emailVerificationService,
    );
  });

  describe('login', () => {
    it('returns session on successful login', async () => {
      const mockSession = {
        accessToken: 'token',
        refreshToken: 'refresh',
        expiresAt: 9999999999,
        user: {
          id: '1',
          email: 'test@test.com',
          name: 'Test',
          role: 'STUDENT',
          isActive: true,
          isFirstLogin: false,
          createdAt: '2024-01-01',
        },
      };
      authRepo.signIn.mockResolvedValue(mockSession);

      const result = await authService.login('test@test.com', 'password123', '127.0.0.1', 'Mozilla/5.0');
      expect(result).toEqual(mockSession);
      expect(authRepo.signIn).toHaveBeenCalledWith('test@test.com', 'password123');
    });

    it('throws on invalid credentials', async () => {
      authRepo.signIn.mockRejectedValue(new InvalidCredentialsError());

      await expect(authService.login('test@test.com', 'wrong')).rejects.toThrow();
    });

    it('logs failed login attempt', async () => {
      authRepo.signIn.mockRejectedValue(new InvalidCredentialsError());

      await authService.login('test@test.com', 'wrong').catch(() => {});
      expect(auditRepo.log).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'LOGIN_FAILED' })
      );
    });
  });

  describe('logout', () => {
    it('calls signOut and logs event', async () => {
      authRepo.signOut.mockResolvedValue(undefined);

      await authService.logout('user1', 'school1');
      expect(authRepo.signOut).toHaveBeenCalled();
      expect(auditRepo.log).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'LOGOUT', userId: 'user1' })
      );
    });
  });

  describe('forgotPassword', () => {
    it('calls resetPassword and logs event', async () => {
      authRepo.resetPassword.mockResolvedValue(undefined);

      await authService.forgotPassword('test@test.com');
      expect(authRepo.resetPassword).toHaveBeenCalledWith('test@test.com');
      expect(auditRepo.log).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'PASSWORD_RESET' })
      );
    });
  });

  describe('changePassword', () => {
    it('validates password policy', async () => {
      authRepo.updateUserPassword.mockResolvedValue(undefined);

      await expect(
        authService.changePassword('user1', 'old', 'NewPass123')
      ).resolves.toBeUndefined();
      expect(authRepo.updateUserPassword).toHaveBeenCalledWith('NewPass123');
    });

    it('rejects weak password', async () => {
      await expect(
        authService.changePassword('user1', 'old', 'weak')
      ).rejects.toThrow();
    });
  });
});
