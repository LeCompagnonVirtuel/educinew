import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface CredentialInteroperability {
  id: string;
  school_id: string;
  credential_id: string;
  target_format: 'did' | 'jwt' | 'vc' | 'json' | 'xml' | 'cbor';
  target_system: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  mapped_data?: Record<string, unknown>;
  error_message?: string;
  completed_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateCredentialInteroperabilityRequest {
  school_id: string;
  credential_id: string;
  target_format: CredentialInteroperability['target_format'];
  target_system: string;
  status?: CredentialInteroperability['status'];
  mapped_data?: Record<string, unknown>;
  error_message?: string;
  completed_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateCredentialInteroperabilityRequest {
  target_format?: CredentialInteroperability['target_format'];
  target_system?: string;
  status?: CredentialInteroperability['status'];
  mapped_data?: Record<string, unknown> | null;
  error_message?: string | null;
  completed_at?: string;
  metadata?: Record<string, unknown>;
}

export class CredentialInteroperabilityService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<CredentialInteroperability | null> {
    const { data, error } = await this.supabase
      .from('gei2p_credential_interoperability')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching credential interoperability', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as CredentialInteroperability;
  }

  async listEntities(schoolId: string, filters?: { status?: string; target_format?: string; credential_id?: string; limit?: number; offset?: number }): Promise<CredentialInteroperability[]> {
    let query = this.supabase
      .from('gei2p_credential_interoperability')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.target_format) query = query.eq('target_format', filters.target_format);
    if (filters?.credential_id) query = query.eq('credential_id', filters.credential_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing credential interoperability', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as CredentialInteroperability[];
  }

  async createEntity(data: CreateCredentialInteroperabilityRequest): Promise<CredentialInteroperability | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_credential_interoperability')
      .insert({
        school_id: data.school_id,
        credential_id: data.credential_id,
        target_format: data.target_format,
        target_system: data.target_system,
        status: data.status || 'pending',
        mapped_data: data.mapped_data,
        error_message: data.error_message,
        completed_at: data.completed_at,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating credential interoperability', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Credential interoperability created', { id: created.id }, 'gei2p');
    return created as CredentialInteroperability;
  }

  async updateEntity(id: string, data: UpdateCredentialInteroperabilityRequest): Promise<CredentialInteroperability | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_credential_interoperability')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating credential interoperability', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Credential interoperability updated', { id }, 'gei2p');
    return updated as CredentialInteroperability;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_credential_interoperability')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting credential interoperability', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Credential interoperability deleted', { id }, 'gei2p');
    return true;
  }
}
