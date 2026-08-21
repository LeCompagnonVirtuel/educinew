import { createClient } from '@/lib/supabase/client';
import { logger } from '@educi/logger';

export interface AuditSchoolEvent {
  action: string;
  entity: string;
  schoolId?: string;
  userId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditSchoolService {
  async log(event: AuditSchoolEvent): Promise<void> {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('audit_logs').insert({
        action: event.action,
        entity_type: event.entity,
        entity_id: event.schoolId || null,
        user_id: event.userId || null,
        school_id: event.schoolId || null,
        details: event.details || {},
        ip_address: event.ipAddress || null,
        user_agent: event.userAgent || null,
      });

      if (error) {
        logger.error('Failed to write audit log', { error: error.message }, 'schools');
      }
    } catch {
      logger.warn('Audit log table may not exist', { action: event.action }, 'schools');
    }
  }
}
