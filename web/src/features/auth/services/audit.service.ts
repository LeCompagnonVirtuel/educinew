import type { AuditRepository, AuditEvent } from '../types';
import { logger } from '@educi/logger';

export class AuditService {
  constructor(private readonly auditRepo: AuditRepository) {}

  async log(event: Omit<AuditEvent, 'id' | 'timestamp'>): Promise<void> {
    await this.auditRepo.log(event);
  }

  async logLogin(schoolId: string, userId: string, userAgent?: string): Promise<void> {
    await this.log({
      action: 'LOGIN',
      entity: 'auth',
      userId,
      schoolId,
      userAgent,
    });
  }

  async logLogout(schoolId: string, userId: string): Promise<void> {
    await this.log({
      action: 'LOGOUT',
      entity: 'auth',
      userId,
      schoolId,
    });
  }

  async logFailedLogin(schoolId: string | null, identifier: string, reason: string): Promise<void> {
    await this.log({
      action: 'LOGIN_FAILED',
      entity: 'auth',
      schoolId: schoolId || undefined,
      details: { identifier, reason },
    });
  }

  async logPasswordChange(userId: string): Promise<void> {
    await this.log({
      action: 'PASSWORD_CHANGE',
      entity: 'auth',
      userId,
    });
  }

  async logPasswordReset(email: string): Promise<void> {
    await this.log({
      action: 'PASSWORD_RESET',
      entity: 'auth',
      details: { email },
    });
  }

  async logMFAEnable(userId: string, method: string): Promise<void> {
    await this.log({
      action: 'MFA_ENABLE',
      entity: 'auth',
      userId,
      details: { method },
    });
  }

  async logMFADisable(userId: string, method: string): Promise<void> {
    await this.log({
      action: 'MFA_DISABLE',
      entity: 'auth',
      userId,
      details: { method },
    });
  }

  async logRBACDenied(userId: string, role: string, resource: string, action: string): Promise<void> {
    await this.log({
      action: 'RBAC_DENIED',
      entity: 'rbac',
      userId,
      details: { role, resource, action },
    });
    logger.security('RBAC denied', { userId, role, resource, action }, 'rbac');
  }

  async logAccountLock(userId: string, lockedUntil: Date): Promise<void> {
    await this.log({
      action: 'ACCOUNT_LOCK',
      entity: 'auth',
      userId,
      details: { lockedUntil: lockedUntil.toISOString() },
    });
  }
}
