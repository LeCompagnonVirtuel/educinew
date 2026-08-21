import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Audit {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  action: 'create' | 'update' | 'delete' | 'access' | 'export' | 'share';
  performed_by: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface CreateAuditRequest {
  school_id: string;
  entity_type: string;
  entity_id: string;
  action: Audit['action'];
  performed_by: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAuditRequest {
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class AuditService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Audit | null> {
    const { data, error } = await this.supabase
      .from('gei2p_audits')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching audit', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Audit;
  }

  async listEntities(schoolId: string, filters?: { entity_type?: string; action?: string; performed_by?: string; limit?: number; offset?: number }): Promise<Audit[]> {
    let query = this.supabase
      .from('gei2p_audits')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.entity_type) query = query.eq('entity_type', filters.entity_type);
    if (filters?.action) query = query.eq('action', filters.action);
    if (filters?.performed_by) query = query.eq('performed_by', filters.performed_by);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing audits', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Audit[];
  }

  async createEntity(data: CreateAuditRequest): Promise<Audit | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_audits')
      .insert({
        school_id: data.school_id,
        entity_type: data.entity_type,
        entity_id: data.entity_id,
        action: data.action,
        performed_by: data.performed_by,
        old_values: data.old_values,
        new_values: data.new_values,
        ip_address: data.ip_address,
        user_agent: data.user_agent,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating audit', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Audit created', { id: created.id }, 'gei2p');
    return created as Audit;
  }

  async updateEntity(id: string, data: UpdateAuditRequest): Promise<Audit | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_audits')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating audit', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Audit updated', { id }, 'gei2p');
    return updated as Audit;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_audits')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting audit', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Audit deleted', { id }, 'gei2p');
    return true;
  }
}
