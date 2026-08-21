import { supabase } from '../../services/supabase';
import { logger } from '@educi/logger';

export interface MobileAuditService {
  log(event: { action: string; entity: string; userId?: string; schoolId?: string; details?: Record<string, unknown> }): Promise<void>;
}

export function createMobileAuditService(): MobileAuditService {
  return {
    async log(event) {
      try {
        await supabase.from('audit_logs').insert({
          user_id: event.userId || null,
          school_id: event.schoolId || null,
          action: event.action,
          entity: event.entity,
          details: event.details ? JSON.stringify(event.details) : null,
        });
        logger.audit(`[Mobile] ${event.action} on ${event.entity}`, {
          userId: event.userId,
          schoolId: event.schoolId,
        }, 'mobile-audit');
      } catch (error) {
        logger.error('Mobile audit log failed', { error: String(error) }, 'mobile-audit');
      }
    },
  };
}
