import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Compliance {
  id: string;
  school_id: string;
  regulation: string;
  description?: string;
  status: 'compliant' | 'non_compliant' | 'partial' | 'under_review';
  last_audit_at?: string;
  next_audit_at?: string;
  findings?: Record<string, unknown>;
  remediation_plan?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateComplianceRequest {
  school_id: string;
  regulation: string;
  description?: string;
  status?: Compliance['status'];
  last_audit_at?: string;
  next_audit_at?: string;
  findings?: Record<string, unknown>;
  remediation_plan?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateComplianceRequest {
  regulation?: string;
  description?: string | null;
  status?: Compliance['status'];
  last_audit_at?: string;
  next_audit_at?: string | null;
  findings?: Record<string, unknown> | null;
  remediation_plan?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}

export class ComplianceService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Compliance | null> {
    const { data, error } = await this.supabase
      .from('gei2p_compliances')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching compliance', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Compliance;
  }

  async listEntities(schoolId: string, filters?: { status?: string; regulation?: string; limit?: number; offset?: number }): Promise<Compliance[]> {
    let query = this.supabase
      .from('gei2p_compliances')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.regulation) query = query.eq('regulation', filters.regulation);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing compliances', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Compliance[];
  }

  async createEntity(data: CreateComplianceRequest): Promise<Compliance | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_compliances')
      .insert({
        school_id: data.school_id,
        regulation: data.regulation,
        description: data.description,
        status: data.status || 'under_review',
        last_audit_at: data.last_audit_at,
        next_audit_at: data.next_audit_at,
        findings: data.findings,
        remediation_plan: data.remediation_plan,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating compliance', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Compliance created', { id: created.id }, 'gei2p');
    return created as Compliance;
  }

  async updateEntity(id: string, data: UpdateComplianceRequest): Promise<Compliance | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_compliances')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating compliance', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Compliance updated', { id }, 'gei2p');
    return updated as Compliance;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_compliances')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting compliance', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Compliance deleted', { id }, 'gei2p');
    return true;
  }
}
