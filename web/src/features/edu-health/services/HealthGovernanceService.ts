import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HealthPolicy {
  id: string;
  school_id: string;
  policy_number: string;
  title: string;
  description: string;
  category: 'health' | 'safeguarding' | 'safety' | 'wellbeing' | 'accessibility' | 'emergency';
  version: string;
  status: 'draft' | 'active' | 'under_review' | 'archived';
  effective_date: string;
  review_date: string;
  expiry_date?: string;
  approved_by?: string;
  approval_date?: string;
  content: string;
  attachments: PolicyAttachment[];
  compliance_requirements: string[];
  applies_to: string[];
  last_reviewed_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PolicyAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  uploaded_at: string;
}

export interface CreateHealthPolicy {
  title: string;
  description: string;
  category: 'health' | 'safeguarding' | 'safety' | 'wellbeing' | 'accessibility' | 'emergency';
  version: string;
  effective_date: string;
  review_date: string;
  content: string;
  compliance_requirements?: string[];
  applies_to?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateHealthPolicy {
  title?: string;
  description?: string;
  version?: string;
  status?: string;
  review_date?: string;
  expiry_date?: string;
  approved_by?: string;
  approval_date?: string;
  content?: string;
  attachments?: PolicyAttachment[];
  compliance_requirements?: string[];
  applies_to?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class HealthGovernanceService {
  private readonly TABLE = 'health_policies';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<HealthPolicy[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<HealthPolicy | null> {
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

  async create(schoolId: string, policy: CreateHealthPolicy): Promise<HealthPolicy> {
    const policyNumber = `POL-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        policy_number: policyNumber,
        ...policy,
        status: 'draft',
        attachments: [],
        compliance_requirements: policy.compliance_requirements || [],
        applies_to: policy.applies_to || [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, policy: UpdateHealthPolicy): Promise<HealthPolicy> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...policy, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string, approvedBy: string): Promise<HealthPolicy> {
    return this.update(schoolId, id, {
      status: 'active',
      approved_by: approvedBy,
      approval_date: new Date().toISOString(),
    });
  }

  async archive(schoolId: string, id: string): Promise<HealthPolicy> {
    return this.update(schoolId, id, { status: 'archived' });
  }

  async getByCategory(schoolId: string, category: string): Promise<HealthPolicy[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<HealthPolicy[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReview(schoolId: string): Promise<HealthPolicy[]> {
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
    draft: number;
    pendingReview: number;
    byCategory: Record<string, number>;
  }> {
    const policies = await this.getAll(schoolId);
    const byCategory: Record<string, number> = {};
    policies.forEach((p) => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
    });

    return {
      total: policies.length,
      active: policies.filter((p) => p.status === 'active').length,
      draft: policies.filter((p) => p.status === 'draft').length,
      pendingReview: policies.filter(
        (p) => p.status === 'active' && p.review_date <= new Date().toISOString().split('T')[0]
      ).length,
      byCategory,
    };
  }
}
