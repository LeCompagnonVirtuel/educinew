import type { AcademicRepository, AcademicFilters } from '../types';
import { AppError } from '@educi/errors';
import { logger } from '@educi/logger';
import type { SupabaseClient } from '@supabase/supabase-js';

interface AuditEntry {
  id: string;
  schoolId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, unknown>;
  createdAt: string;
}

interface AuditFilters {
  entityType?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
  userId?: string;
  page?: number;
  limit?: number;
}

export class AuditAcademicService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly academicRepo: AcademicRepository, supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  /**
   * Logs an academic action to the audit trail.
   */
  async logAction(
    schoolId: string,
    userId: string,
    action: string,
    entityType: string,
    entityId: string,
    details?: Record<string, unknown>,
  ): Promise<void> {
    if (!schoolId || !userId || !action || !entityType || !entityId) {
      throw new AppError(
        'Tous les champs sont requis pour enregistrer une action',
        'AUDIT_VALIDATION_ERROR',
        400,
      );
    }

    const { error } = await this.supabase.from('academic_audit_log').insert({
      school_id: schoolId,
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details: details || {},
      created_at: new Date().toISOString(),
    });

    if (error) {
      logger.error('Failed to log audit action', { schoolId, userId, action, entityType, entityId }, 'academic');
      throw new AppError(
        'Erreur lors de l\'enregistrement de l\'action',
        'AUDIT_LOG_ERROR',
        500,
      );
    }

    logger.info('Audit action logged', { schoolId, userId, action, entityType, entityId }, 'academic');
  }

  /**
   * Lists audit entries with optional filters for entity type, action, date range, and user.
   */
  async getAuditLog(
    schoolId: string,
    filters: AuditFilters,
  ): Promise<{ data: AuditEntry[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;

    let query = this.supabase
      .from('academic_audit_log')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId);

    if (filters.entityType) {
      query = query.eq('entity_type', filters.entityType);
    }
    if (filters.action) {
      query = query.eq('action', filters.action);
    }
    if (filters.userId) {
      query = query.eq('user_id', filters.userId);
    }
    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw new AppError(
        'Erreur lors de la récupération du journal d\'audit',
        'AUDIT_FETCH_ERROR',
        500,
      );
    }

    logger.info('Audit log retrieved', { schoolId, total: count || 0 }, 'academic');

    return {
      data: data || [],
      total: count || 0,
    };
  }

  /**
   * Returns the full audit history for a specific entity.
   */
  async getEntityAuditHistory(
    schoolId: string,
    entityType: string,
    entityId: string,
  ): Promise<AuditEntry[]> {
    const { data, error } = await this.supabase
      .from('academic_audit_log')
      .select('*')
      .eq('school_id', schoolId)
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new AppError(
        'Erreur lors de la récupération de l\'historique',
        'AUDIT_HISTORY_ERROR',
        500,
      );
    }

    logger.info('Entity audit history retrieved', { schoolId, entityType, entityId, count: (data || []).length }, 'academic');

    return data || [];
  }

  /**
   * Returns the most recent audit entries for a school.
   */
  async getRecentActivity(
    schoolId: string,
    limit: number = 20,
  ): Promise<AuditEntry[]> {
    const { data, error } = await this.supabase
      .from('academic_audit_log')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new AppError(
        'Erreur lors de la récupération de l\'activité récente',
        'AUDIT_RECENT_ERROR',
        500,
      );
    }

    logger.info('Recent activity retrieved', { schoolId, count: (data || []).length }, 'academic');

    return data || [];
  }
}
