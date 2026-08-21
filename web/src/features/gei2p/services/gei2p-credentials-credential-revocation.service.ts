import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface CredentialRevocation {
  id: string;
  school_id: string;
  credential_id: string;
  reason: string;
  revoked_by: string;
  revoked_at: string;
  status: 'active' | 'revoked' | 'expired';
  revocation_list_id?: string;
  evidence?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateCredentialRevocationRequest {
  school_id: string;
  credential_id: string;
  reason: string;
  revoked_by: string;
  revoked_at?: string;
  status?: CredentialRevocation['status'];
  revocation_list_id?: string;
  evidence?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateCredentialRevocationRequest {
  reason?: string;
  revoked_by?: string;
  status?: CredentialRevocation['status'];
  revocation_list_id?: string;
  evidence?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}

export class CredentialRevocationService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<CredentialRevocation | null> {
    const { data, error } = await this.supabase
      .from('gei2p_credential_revocations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching credential revocation', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as CredentialRevocation;
  }

  async listEntities(schoolId: string, filters?: { status?: string; credential_id?: string; limit?: number; offset?: number }): Promise<CredentialRevocation[]> {
    let query = this.supabase
      .from('gei2p_credential_revocations')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.credential_id) query = query.eq('credential_id', filters.credential_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing credential revocations', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as CredentialRevocation[];
  }

  async createEntity(data: CreateCredentialRevocationRequest): Promise<CredentialRevocation | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_credential_revocations')
      .insert({
        school_id: data.school_id,
        credential_id: data.credential_id,
        reason: data.reason,
        revoked_by: data.revoked_by,
        revoked_at: data.revoked_at || new Date().toISOString(),
        status: data.status || 'revoked',
        revocation_list_id: data.revocation_list_id,
        evidence: data.evidence,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating credential revocation', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Credential revocation created', { id: created.id }, 'gei2p');
    return created as CredentialRevocation;
  }

  async updateEntity(id: string, data: UpdateCredentialRevocationRequest): Promise<CredentialRevocation | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_credential_revocations')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating credential revocation', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Credential revocation updated', { id }, 'gei2p');
    return updated as CredentialRevocation;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_credential_revocations')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting credential revocation', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Credential revocation deleted', { id }, 'gei2p');
    return true;
  }
}
