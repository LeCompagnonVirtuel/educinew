import { getSupabase } from './shared';

export const authAudit = {
  async log(params: {
    schoolId: string;
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    const supabase = getSupabase();
    const { error } = await supabase.from('audit_logs').insert({
      school_id: params.schoolId,
      user_id: params.userId || null,
      action: params.action,
      entity: params.entity,
      entity_id: params.entityId || null,
      details: params.details || null,
      ip_address: params.ipAddress || null,
      user_agent: params.userAgent || null,
    });
    if (error) console.error('Audit log error:', error);
  },

  async logLogin(schoolId: string, userId: string, userAgent?: string) {
    return this.log({
      schoolId,
      userId,
      action: 'LOGIN',
      entity: 'auth',
      details: 'User logged in',
      userAgent,
    });
  },

  async logLogout(schoolId: string, userId: string) {
    return this.log({
      schoolId,
      userId,
      action: 'LOGOUT',
      entity: 'auth',
      details: 'User logged out',
    });
  },

  async logPasswordChange(schoolId: string, userId: string) {
    return this.log({
      schoolId,
      userId,
      action: 'PASSWORD_CHANGE',
      entity: 'auth',
      details: 'User changed password',
    });
  },

  async logPasswordReset(schoolId: string, userId: string) {
    return this.log({
      schoolId,
      userId,
      action: 'PASSWORD_RESET',
      entity: 'auth',
      details: 'User reset password via email',
    });
  },

  async logFailedLogin(schoolId: string | null, identifier: string, reason: string, userAgent?: string) {
    return this.log({
      schoolId: schoolId || '00000000-0000-0000-0000-000000000000',
      action: 'LOGIN_FAILED',
      entity: 'auth',
      details: `Failed login for ${identifier}: ${reason}`,
      userAgent,
    });
  },

  async logMfaEnable(schoolId: string, userId: string) {
    return this.log({
      schoolId,
      userId,
      action: 'MFA_ENABLE',
      entity: 'auth',
      details: 'User enabled MFA',
    });
  },

  async logMfaDisable(schoolId: string, userId: string) {
    return this.log({
      schoolId,
      userId,
      action: 'MFA_DISABLE',
      entity: 'auth',
      details: 'User disabled MFA',
    });
  },
};
