import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface DataGovernance {
  id: string;
  school_id: string;
  name: string;
  policy_type: 'retention' | 'classification' | 'access_control' | 'quality' | 'privacy';
  rules: Record<string, unknown>;
  status: 'active' | 'inactive' | 'draft';
  effective_date: string;
  expiry_date?: string;
  applies_to?: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateDataGovernanceRequest {
  school_id: string;
  name: string;
  policy_type: DataGovernance['policy_type'];
  rules: Record<string, unknown>;
  status?: DataGovernance['status'];
  effective_date: string;
  expiry_date?: string;
  applies_to?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateDataGovernanceRequest {
  name?: string;
  policy_type?: DataGovernance['policy_type'];
  rules?: Record<string, unknown>;
  status?: DataGovernance['status'];
  effective_date?: string;
  expiry_date?: string | null;
  applies_to?: string[];
  metadata?: Record<string, unknown>;
}

export class DataGovernanceService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<DataGovernance | null> {
    const { data, error } = await this.supabase
      .from('gei2p_data_governance')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching data governance', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as DataGovernance;
  }

  async listEntities(schoolId: string, filters?: { status?: string; policy_type?: string; limit?: number; offset?: number }): Promise<DataGovernance[]> {
    let query = this.supabase
      .from('gei2p_data_governance')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.policy_type) query = query.eq('policy_type', filters.policy_type);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing data governance', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as DataGovernance[];
  }

  async createEntity(data: CreateDataGovernanceRequest): Promise<DataGovernance | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_data_governance')
      .insert({
        school_id: data.school_id,
        name: data.name,
        policy_type: data.policy_type,
        rules: data.rules,
        status: data.status || 'active',
        effective_date: data.effective_date,
        expiry_date: data.expiry_date,
        applies_to: data.applies_to,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating data governance', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data governance created', { id: created.id }, 'gei2p');
    return created as DataGovernance;
  }

  async updateEntity(id: string, data: UpdateDataGovernanceRequest): Promise<DataGovernance | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_data_governance')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating data governance', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data governance updated', { id }, 'gei2p');
    return updated as DataGovernance;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_data_governance')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting data governance', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Data governance deleted', { id }, 'gei2p');
    return true;
  }
}
