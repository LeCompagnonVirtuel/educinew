import { createClient } from '@/lib/supabase/client';
import type { AuditRepository, AuditEvent, AuditEventFilters } from '../types';
import { logger } from '@educi/logger';

export function createAuditRepository(): AuditRepository {
  const supabase = createClient();

  return {
    async log(event) {
      try {
        const { error } = await supabase.from('audit_logs').insert({
          school_id: event.schoolId || null,
          user_id: event.userId || null,
          action: event.action,
          entity: event.entity,
          entity_id: event.entityId || null,
          details: event.details ? JSON.stringify(event.details) : null,
          ip_address: event.ipAddress || null,
        });
        if (error) {
          logger.error('Audit log insert failed', { error: error.message }, 'audit');
        }
        logger.audit(`${event.action} on ${event.entity}`, {
          schoolId: event.schoolId,
          userId: event.userId,
          entityId: event.entityId,
          action: event.action,
        }, 'audit');
      } catch (err) {
        logger.error('Audit log error', { error: String(err) }, 'audit');
      }
    },

    async getEvents(filters: AuditEventFilters): Promise<AuditEvent[]> {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.schoolId) query = query.eq('school_id', filters.schoolId);
      if (filters.userId) query = query.eq('user_id', filters.userId);
      if (filters.action) query = query.eq('action', filters.action);
      if (filters.entity) query = query.eq('entity', filters.entity);
      if (filters.startDate) query = query.gte('created_at', filters.startDate);
      if (filters.endDate) query = query.lte('created_at', filters.endDate);
      if (filters.limit) query = query.limit(filters.limit);
      if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);

      const { data, error } = await query;
      if (error) {
        logger.error('Audit log query failed', { error: error.message }, 'audit');
        return [];
      }

      return (data || []).map((row) => ({
        id: row.id,
        schoolId: row.school_id,
        userId: row.user_id,
        action: row.action,
        entity: row.entity,
        entityId: row.entity_id,
        details: row.details ? JSON.parse(row.details) : undefined,
        ipAddress: row.ip_address,
        timestamp: row.created_at,
      }));
    },
  };
}
