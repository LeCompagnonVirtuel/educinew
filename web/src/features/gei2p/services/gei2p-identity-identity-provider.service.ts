import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface IdentityProvider {
  id: string;
  school_id: string;
  name: string;
  provider_type: 'oidc' | 'saml' | 'oauth2' | 'ldap' | 'kerberos' | 'custom';
  endpoint: string;
  client_id?: string;
  client_secret?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateIdentityProviderRequest {
  school_id: string;
  name: string;
  provider_type: IdentityProvider['provider_type'];
  endpoint: string;
  client_id?: string;
  client_secret?: string;
  status?: IdentityProvider['status'];
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateIdentityProviderRequest {
  name?: string;
  provider_type?: IdentityProvider['provider_type'];
  endpoint?: string;
  client_id?: string;
  client_secret?: string | null;
  status?: IdentityProvider['status'];
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class IdentityProviderService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<IdentityProvider | null> {
    const { data, error } = await this.supabase
      .from('gei2p_identity_providers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching identity provider', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as IdentityProvider;
  }

  async listEntities(schoolId: string, filters?: { status?: string; provider_type?: string; limit?: number; offset?: number }): Promise<IdentityProvider[]> {
    let query = this.supabase
      .from('gei2p_identity_providers')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.provider_type) query = query.eq('provider_type', filters.provider_type);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing identity providers', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as IdentityProvider[];
  }

  async createEntity(data: CreateIdentityProviderRequest): Promise<IdentityProvider | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_identity_providers')
      .insert({
        school_id: data.school_id,
        name: data.name,
        provider_type: data.provider_type,
        endpoint: data.endpoint,
        client_id: data.client_id,
        client_secret: data.client_secret,
        status: data.status || 'active',
        config: data.config,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating identity provider', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Identity provider created', { id: created.id }, 'gei2p');
    return created as IdentityProvider;
  }

  async updateEntity(id: string, data: UpdateIdentityProviderRequest): Promise<IdentityProvider | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_identity_providers')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating identity provider', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Identity provider updated', { id }, 'gei2p');
    return updated as IdentityProvider;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_identity_providers')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting identity provider', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Identity provider deleted', { id }, 'gei2p');
    return true;
  }
}
