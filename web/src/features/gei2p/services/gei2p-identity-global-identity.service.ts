import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface GlobalIdentity {
  id: string;
  school_id: string;
  user_id: string;
  identity_type: 'national' | 'international' | 'digital' | 'biometric' | 'federated' | 'anonymous';
  status: 'active' | 'inactive' | 'pending' | 'suspended' | 'revoked' | 'expired';
  issuer: string;
  issuer_country: string;
  format: 'did' | 'jwt' | 'vc' | 'json' | 'xml' | 'cbor';
  public_key?: string;
  verification_method: 'document' | 'biometric' | 'knowledge' | 'social' | 'digital' | 'hybrid';
  expiry_date?: string;
  trust_level: 'low' | 'medium' | 'high' | 'very_high';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateGlobalIdentityRequest {
  school_id: string;
  user_id: string;
  identity_type: GlobalIdentity['identity_type'];
  status?: GlobalIdentity['status'];
  issuer: string;
  issuer_country: string;
  format: GlobalIdentity['format'];
  public_key?: string;
  verification_method: GlobalIdentity['verification_method'];
  expiry_date?: string;
  trust_level?: GlobalIdentity['trust_level'];
  metadata?: Record<string, unknown>;
}

export interface UpdateGlobalIdentityRequest {
  identity_type?: GlobalIdentity['identity_type'];
  status?: GlobalIdentity['status'];
  issuer?: string;
  issuer_country?: string;
  format?: GlobalIdentity['format'];
  public_key?: string | null;
  verification_method?: GlobalIdentity['verification_method'];
  expiry_date?: string | null;
  trust_level?: GlobalIdentity['trust_level'];
  metadata?: Record<string, unknown>;
}

export class GlobalIdentityService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<GlobalIdentity | null> {
    const { data, error } = await this.supabase
      .from('gei2p_global_identities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching global identity', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as GlobalIdentity;
  }

  async listEntities(schoolId: string, filters?: { status?: string; identity_type?: string; limit?: number; offset?: number }): Promise<GlobalIdentity[]> {
    let query = this.supabase
      .from('gei2p_global_identities')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.identity_type) query = query.eq('identity_type', filters.identity_type);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing global identities', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as GlobalIdentity[];
  }

  async createEntity(data: CreateGlobalIdentityRequest): Promise<GlobalIdentity | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_global_identities')
      .insert({
        school_id: data.school_id,
        user_id: data.user_id,
        identity_type: data.identity_type,
        status: data.status || 'active',
        issuer: data.issuer,
        issuer_country: data.issuer_country,
        format: data.format,
        public_key: data.public_key,
        verification_method: data.verification_method,
        expiry_date: data.expiry_date,
        trust_level: data.trust_level || 'medium',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating global identity', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Global identity created', { id: created.id }, 'gei2p');
    return created as GlobalIdentity;
  }

  async updateEntity(id: string, data: UpdateGlobalIdentityRequest): Promise<GlobalIdentity | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_global_identities')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating global identity', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Global identity updated', { id }, 'gei2p');
    return updated as GlobalIdentity;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_global_identities')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting global identity', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Global identity deleted', { id }, 'gei2p');
    return true;
  }
}
