import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Consent {
  id: string;
  school_id: string;
  user_id: string;
  consent_type: 'data_processing' | 'data_sharing' | 'marketing' | 'analytics' | 'third_party';
  status: 'granted' | 'revoked' | 'pending';
  granted_at?: string;
  revoked_at?: string;
  expires_at?: string;
  scope?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateConsentRequest {
  school_id: string;
  user_id: string;
  consent_type: Consent['consent_type'];
  status?: Consent['status'];
  granted_at?: string;
  revoked_at?: string;
  expires_at?: string;
  scope?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateConsentRequest {
  status?: Consent['status'];
  granted_at?: string;
  revoked_at?: string;
  expires_at?: string | null;
  scope?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}

export class ConsentService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Consent | null> {
    const { data, error } = await this.supabase
      .from('gei2p_consents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching consent', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Consent;
  }

  async listEntities(schoolId: string, filters?: { status?: string; consent_type?: string; user_id?: string; limit?: number; offset?: number }): Promise<Consent[]> {
    let query = this.supabase
      .from('gei2p_consents')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.consent_type) query = query.eq('consent_type', filters.consent_type);
    if (filters?.user_id) query = query.eq('user_id', filters.user_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing consents', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Consent[];
  }

  async createEntity(data: CreateConsentRequest): Promise<Consent | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_consents')
      .insert({
        school_id: data.school_id,
        user_id: data.user_id,
        consent_type: data.consent_type,
        status: data.status || 'pending',
        granted_at: data.granted_at,
        revoked_at: data.revoked_at,
        expires_at: data.expires_at,
        scope: data.scope,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating consent', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Consent created', { id: created.id }, 'gei2p');
    return created as Consent;
  }

  async updateEntity(id: string, data: UpdateConsentRequest): Promise<Consent | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_consents')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating consent', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Consent updated', { id }, 'gei2p');
    return updated as Consent;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_consents')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting consent', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Consent deleted', { id }, 'gei2p');
    return true;
  }
}
