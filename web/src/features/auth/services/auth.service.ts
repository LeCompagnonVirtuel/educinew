import type { AuthRepository } from '../types';
import type { AuthUser, AuthSession } from '@educi/types';
import { AuthenticationError, InvalidCredentialsError, EmailNotVerifiedError } from '@educi/errors';
import { logger } from '@educi/logger';
import { PasswordService } from './password.service';
import { SessionService } from './session.service';
import { AuditService } from './audit.service';
import { SecurityService } from './security.service';
import { EmailVerificationService } from './email-verification.service';

export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly sessionService: SessionService,
    private readonly auditService: AuditService,
    private readonly securityService: SecurityService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  async login(identifier: string, password: string, ip?: string, userAgent?: string): Promise<AuthSession> {
    await this.securityService.checkLoginAttempts(identifier);

    try {
      const session = await this.authRepo.signIn(identifier, password);

      await this.securityService.recordSuccessfulLogin(identifier);

      await this.auditService.log({
        action: 'LOGIN',
        entity: 'auth',
        userId: session.user.id,
        schoolId: session.user.schoolId,
        ipAddress: ip,
        userAgent,
      });

      logger.info('User logged in', {
        userId: session.user.id,
        role: session.user.role,
        schoolId: session.user.schoolId,
      }, 'auth');

      return session;
    } catch (error) {
      await this.securityService.recordFailedLogin(identifier);

      await this.auditService.log({
        action: 'LOGIN_FAILED',
        entity: 'auth',
        details: { identifier, reason: error instanceof Error ? error.message : 'Unknown' },
        ipAddress: ip,
        userAgent,
      });

      logger.security('Login failed', {
        identifier,
        reason: error instanceof Error ? error.message : 'Unknown',
        ip,
      }, 'auth');

      throw error;
    }
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
    schoolId?: string;
    phone?: string;
  }): Promise<{ userId: string; requiresConfirmation: boolean }> {
    const result = await this.authRepo.signUp({
      email: data.email,
      password: data.password,
      metadata: {
        name: data.name,
        role: data.role || 'STUDENT',
        school_id: data.schoolId,
        phone: data.phone,
      },
    });

    await this.auditService.log({
      action: 'INVITATION_CREATE',
      entity: 'auth',
      userId: result.userId,
      schoolId: data.schoolId,
      details: { email: data.email, role: data.role },
    });

    logger.info('User registered', { userId: result.userId, email: data.email }, 'auth');

    return result;
  }

  async logout(userId: string, schoolId?: string): Promise<void> {
    await this.authRepo.signOut();

    await this.auditService.log({
      action: 'LOGOUT',
      entity: 'auth',
      userId,
      schoolId,
    });

    logger.info('User logged out', { userId, schoolId }, 'auth');
  }

  async getProfile(userId: string): Promise<AuthUser> {
    const user = await this.authRepo.getUser();
    if (!user) throw new AuthenticationError('Non authentifié');
    return user;
  }

  async forgotPassword(email: string): Promise<void> {
    await this.authRepo.resetPassword(email);

    await this.auditService.log({
      action: 'PASSWORD_RESET',
      entity: 'auth',
      details: { email },
    });

    logger.info('Password reset requested', { email }, 'auth');
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const violations = this.passwordService.validate(newPassword);
    if (violations.length > 0) {
      const { PasswordPolicyError } = await import('@educi/errors');
      throw new PasswordPolicyError(violations);
    }

    await this.authRepo.updateUserPassword(newPassword);

    await this.auditService.log({
      action: 'PASSWORD_CHANGE',
      entity: 'auth',
      userId,
    });

    logger.info('Password changed', { userId }, 'auth');
  }

  async verifyEmail(token: string): Promise<void> {
    await this.authRepo.verifyEmail(token);

    await this.auditService.log({
      action: 'EMAIL_VERIFY',
      entity: 'auth',
      details: { token: '***' },
    });

    logger.info('Email verified', { token: '***' }, 'auth');
  }

  async refreshSession(): Promise<AuthSession> {
    return this.sessionService.refresh();
  }
}
