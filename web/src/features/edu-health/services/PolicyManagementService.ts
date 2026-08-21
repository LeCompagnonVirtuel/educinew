import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface PolicyManagementRecord {
  id: string;
  school_id: string;
  record_number: string;
  policy_name: string;
  policy_type: 'health' | 'safeguarding' | 'safety' | 'wellbeing' | 'accessibility' | 'emergency' | 'data' | 'other';
  status: 'draft' | 'active' | 'under_review' | 'archived' | 'expired';
  version: string;
  effective_date: string;
  review_date: string;
  expiry_date?: string;
  owner_id: string;
  approved_by?: string;
  approval_date?: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  distribution_list: string[];
  training_required: boolean;
  training_completion_rate: number;
  last_amendment_date?: string;
  amendment_reason?: string;
  document_url?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreatePolicyManagementRecord {
  policy_name: string;
  policy_type: 'health' | 'safeguarding' | 'safety' | 'wellbeing' | 'accessibility' | 'emergency' | 'data' | 'other';
  version: string;
  effective_date: string;
  review_date: string;
  expiry_date?: string;
  owner_id: string;
  distribution_list?: string[];
  training_required?: boolean;
  document_url?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdatePolicyManagementRecord {
  status?: string;
  version?: string;
  review_date?: string;
  expiry_date?: string;
  approved_by?: string;
  approval_date?: string;
  approval_status?: string;
  distribution_list?: string[];
  training_required?: boolean;
  training_completion_rate?: number;
  last_amendment_date?: string;
  amendment_reason?: string;
  document_url?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class PolicyManagementService {
  private readonly TABLE = 'policy_management_records';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<PolicyManagementRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<PolicyManagementRecord | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, record: CreatePolicyManagementRecord): Promise<PolicyManagementRecord> {
    const recordNumber = `PM-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        record_number: recordNumber,
        ...record,
        status: 'draft',
        approval_status: 'pending',
        distribution_list: record.distribution_list || [],
        training_required: record.training_required ?? false,
        training_completion_rate: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, record: UpdatePolicyManagementRecord): Promise<PolicyManagementRecord> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...record, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async approve(schoolId: string, id: string, approvedBy: string): Promise<PolicyManagementRecord> {
    return this.update(schoolId, id, {
      status: 'active',
      approval_status: 'approved',
      approved_by: approvedBy,
      approval_date: new Date().toISOString(),
    });
  }

  async archive(schoolId: string, id: string): Promise<PolicyManagementRecord> {
    return this.update(schoolId, id, { status: 'archived' });
  }

  async getByType(schoolId: string, policyType: string): Promise<PolicyManagementRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('policy_type', policyType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingApproval(schoolId: string): Promise<PolicyManagementRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('approval_status', 'pending')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReview(schoolId: string): Promise<PolicyManagementRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .lte('review_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    pendingApproval: number;
    pendingReview: number;
    byType: Record<string, number>;
    averageTrainingCompletion: number;
  }> {
    const records = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    records.forEach((r) => {
      byType[r.policy_type] = (byType[r.policy_type] || 0) + 1;
    });

    const activeWithTraining = records.filter((r) => r.status === 'active' && r.training_required);

    return {
      total: records.length,
      active: records.filter((r) => r.status === 'active').length,
      pendingApproval: records.filter((r) => r.approval_status === 'pending').length,
      pendingReview: records.filter(
        (r) => r.status === 'active' && r.review_date <= new Date().toISOString().split('T')[0]
      ).length,
      byType,
      averageTrainingCompletion: activeWithTraining.length > 0
        ? activeWithTraining.reduce((sum, r) => sum + r.training_completion_rate, 0) / activeWithTraining.length
        : 0,
    };
  }
}
