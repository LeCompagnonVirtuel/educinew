import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface DigitalIdentity {
  id: string;
  school_id: string;
  identity_id: string;
  provider: string;
  provider_type: 'oidc' | 'saml' | 'oauth2' | 'ldap' | 'kerberos' | 'custom';
  external_identifier: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  tokens?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateDigitalIdentityRequest {
  school_id: string;
  identity_id: string;
  provider: string;
  provider_type: DigitalIdentity['provider_type'];
  external_identifier: string;
  status?: DigitalIdentity['status'];
  tokens?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateDigitalIdentityRequest {
  provider?: string;
  provider_type?: DigitalIdentity['provider_type'];
  external_identifier?: string;
  status?: DigitalIdentity['status'];
  tokens?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}

export class DigitalIdentityService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<DigitalIdentity | null> {
    const { data, error } = await this.supabase
      .from('gei2p_digital_identities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching digital identity', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as DigitalIdentity;
  }

  async listEntities(schoolId: string, filters?: { status?: string; provider_type?: string; limit?: number; offset?: number }): Promise<DigitalIdentity[]> {
    let query = this.supabase
      .from('gei2p_digital_identities')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.provider_type) query = query.eq('provider_type', filters.provider_type);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing digital identities', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as DigitalIdentity[];
  }

  async createEntity(data: CreateDigitalIdentityRequest): Promise<DigitalIdentity | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_digital_identities')
      .insert({
        school_id: data.school_id,
        identity_id: data.identity_id,
        provider: data.provider,
        provider_type: data.provider_type,
        external_identifier: data.external_identifier,
        status: data.status || 'active',
        tokens: data.tokens,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating digital identity', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Digital identity created', { id: created.id }, 'gei2p');
    return created as DigitalIdentity;
  }

  async updateEntity(id: string, data: UpdateDigitalIdentityRequest): Promise<DigitalIdentity | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_digital_identities')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating digital identity', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Digital identity updated', { id }, 'gei2p');
    return updated as DigitalIdentity;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_digital_identities')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting digital identity', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Digital identity deleted', { id }, 'gei2p');
    return true;
  }
}
