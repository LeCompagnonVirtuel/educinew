import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Policy {
  id: string;
  school_id: string;
  name: string;
  description?: string;
  policy_category: 'security' | 'privacy' | 'compliance' | 'operational' | 'technical';
  rules: Record<string, unknown>;
  enforcement: 'strict' | 'advisory' | 'audit_only';
  status: 'active' | 'inactive' | 'draft';
  version: string;
  effective_date: string;
  review_date?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreatePolicyRequest {
  school_id: string;
  name: string;
  description?: string;
  policy_category: Policy['policy_category'];
  rules: Record<string, unknown>;
  enforcement: Policy['enforcement'];
  status?: Policy['status'];
  version: string;
  effective_date: string;
  review_date?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdatePolicyRequest {
  name?: string;
  description?: string | null;
  policy_category?: Policy['policy_category'];
  rules?: Record<string, unknown>;
  enforcement?: Policy['enforcement'];
  status?: Policy['status'];
  version?: string;
  effective_date?: string;
  review_date?: string | null;
  metadata?: Record<string, unknown>;
}

export class PolicyService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Policy | null> {
    const { data, error } = await this.supabase
      .from('gei2p_policies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching policy', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Policy;
  }

  async listEntities(schoolId: string, filters?: { status?: string; policy_category?: string; enforcement?: string; limit?: number; offset?: number }): Promise<Policy[]> {
    let query = this.supabase
      .from('gei2p_policies')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.policy_category) query = query.eq('policy_category', filters.policy_category);
    if (filters?.enforcement) query = query.eq('enforcement', filters.enforcement);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing policies', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Policy[];
  }

  async createEntity(data: CreatePolicyRequest): Promise<Policy | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_policies')
      .insert({
        school_id: data.school_id,
        name: data.name,
        description: data.description,
        policy_category: data.policy_category,
        rules: data.rules,
        enforcement: data.enforcement,
        status: data.status || 'active',
        version: data.version,
        effective_date: data.effective_date,
        review_date: data.review_date,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating policy', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Policy created', { id: created.id }, 'gei2p');
    return created as Policy;
  }

  async updateEntity(id: string, data: UpdatePolicyRequest): Promise<Policy | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_policies')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating policy', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Policy updated', { id }, 'gei2p');
    return updated as Policy;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_policies')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting policy', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Policy deleted', { id }, 'gei2p');
    return true;
  }
}
