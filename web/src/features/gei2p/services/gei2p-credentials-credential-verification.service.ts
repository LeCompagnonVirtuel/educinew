import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface CredentialVerification {
  id: string;
  school_id: string;
  credential_id: string;
  verifier_id: string;
  status: 'pending' | 'in_progress' | 'verified' | 'failed';
  verification_method: string;
  result?: Record<string, unknown>;
  verified_at?: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateCredentialVerificationRequest {
  school_id: string;
  credential_id: string;
  verifier_id: string;
  status?: CredentialVerification['status'];
  verification_method: string;
  result?: Record<string, unknown>;
  verified_at?: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateCredentialVerificationRequest {
  verifier_id?: string;
  status?: CredentialVerification['status'];
  verification_method?: string;
  result?: Record<string, unknown> | null;
  verified_at?: string;
  expires_at?: string | null;
  metadata?: Record<string, unknown>;
}

export class CredentialVerificationService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<CredentialVerification | null> {
    const { data, error } = await this.supabase
      .from('gei2p_credential_verifications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching credential verification', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as CredentialVerification;
  }

  async listEntities(schoolId: string, filters?: { status?: string; credential_id?: string; verifier_id?: string; limit?: number; offset?: number }): Promise<CredentialVerification[]> {
    let query = this.supabase
      .from('gei2p_credential_verifications')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.credential_id) query = query.eq('credential_id', filters.credential_id);
    if (filters?.verifier_id) query = query.eq('verifier_id', filters.verifier_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing credential verifications', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as CredentialVerification[];
  }

  async createEntity(data: CreateCredentialVerificationRequest): Promise<CredentialVerification | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_credential_verifications')
      .insert({
        school_id: data.school_id,
        credential_id: data.credential_id,
        verifier_id: data.verifier_id,
        status: data.status || 'pending',
        verification_method: data.verification_method,
        result: data.result,
        verified_at: data.verified_at,
        expires_at: data.expires_at,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating credential verification', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Credential verification created', { id: created.id }, 'gei2p');
    return created as CredentialVerification;
  }

  async updateEntity(id: string, data: UpdateCredentialVerificationRequest): Promise<CredentialVerification | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_credential_verifications')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating credential verification', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Credential verification updated', { id }, 'gei2p');
    return updated as CredentialVerification;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_credential_verifications')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting credential verification', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Credential verification deleted', { id }, 'gei2p');
    return true;
  }
}
