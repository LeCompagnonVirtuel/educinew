import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface CredentialIssuance {
  id: string;
  school_id: string;
  credential_type: string;
  recipient_id: string;
  issuer_id: string;
  status: 'pending' | 'issued' | 'revoked' | 'expired';
  issued_at?: string;
  expires_at?: string;
  evidence?: Record<string, unknown>;
  claims?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateCredentialIssuanceRequest {
  school_id: string;
  credential_type: string;
  recipient_id: string;
  issuer_id: string;
  status?: CredentialIssuance['status'];
  issued_at?: string;
  expires_at?: string;
  evidence?: Record<string, unknown>;
  claims?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateCredentialIssuanceRequest {
  credential_type?: string;
  recipient_id?: string;
  issuer_id?: string;
  status?: CredentialIssuance['status'];
  issued_at?: string;
  expires_at?: string | null;
  evidence?: Record<string, unknown> | null;
  claims?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}

export class CredentialIssuanceService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<CredentialIssuance | null> {
    const { data, error } = await this.supabase
      .from('gei2p_credential_issuances')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching credential issuance', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as CredentialIssuance;
  }

  async listEntities(schoolId: string, filters?: { status?: string; credential_type?: string; recipient_id?: string; limit?: number; offset?: number }): Promise<CredentialIssuance[]> {
    let query = this.supabase
      .from('gei2p_credential_issuances')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.credential_type) query = query.eq('credential_type', filters.credential_type);
    if (filters?.recipient_id) query = query.eq('recipient_id', filters.recipient_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing credential issuances', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as CredentialIssuance[];
  }

  async createEntity(data: CreateCredentialIssuanceRequest): Promise<CredentialIssuance | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_credential_issuances')
      .insert({
        school_id: data.school_id,
        credential_type: data.credential_type,
        recipient_id: data.recipient_id,
        issuer_id: data.issuer_id,
        status: data.status || 'pending',
        issued_at: data.issued_at,
        expires_at: data.expires_at,
        evidence: data.evidence,
        claims: data.claims,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating credential issuance', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Credential issuance created', { id: created.id }, 'gei2p');
    return created as CredentialIssuance;
  }

  async updateEntity(id: string, data: UpdateCredentialIssuanceRequest): Promise<CredentialIssuance | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_credential_issuances')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating credential issuance', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Credential issuance updated', { id }, 'gei2p');
    return updated as CredentialIssuance;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_credential_issuances')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting credential issuance', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Credential issuance deleted', { id }, 'gei2p');
    return true;
  }
}
