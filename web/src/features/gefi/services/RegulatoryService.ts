import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface RegulatoryRequirement {
  id: string;
  school_id: string;
  requirement_code: string;
  name: string;
  description: string;
  regulation_type: 'financial' | 'tax' | 'labor' | 'environmental' | 'educational' | 'data_protection';
  authority: string;
  jurisdiction: string;
  effective_date: string;
  expiry_date?: string;
  frequency: 'annual' | 'quarterly' | 'monthly' | 'on_demand';
  status: 'active' | 'upcoming' | 'expired' | 'superseded';
  compliance_status: 'compliant' | 'non_compliant' | 'pending_review' | 'partial';
  documentation_required: string[];
  next_deadline?: string;
  last_checked?: string;
  checked_by?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ComplianceRecord {
  id: string;
  requirement_id: string;
  period: string;
  status: 'submitted' | 'approved' | 'rejected' | 'pending';
  submission_date?: string;
  approval_date?: string;
  reference_number?: string;
  documents: string[];
  notes?: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRegulatoryRequirement {
  name: string;
  description: string;
  regulation_type: 'financial' | 'tax' | 'labor' | 'environmental' | 'educational' | 'data_protection';
  authority: string;
  jurisdiction: string;
  effective_date: string;
  expiry_date?: string;
  frequency: 'annual' | 'quarterly' | 'monthly' | 'on_demand';
  documentation_required: string[];
  next_deadline?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateRegulatoryRequirement {
  name?: string;
  description?: string;
  status?: string;
  compliance_status?: string;
  next_deadline?: string;
  last_checked?: string;
  checked_by?: string;
  metadata?: Record<string, unknown>;
}

export class RegulatoryService {
  private readonly REQUIREMENTS_TABLE = 'regulatory_requirements';
  private readonly RECORDS_TABLE = 'compliance_records';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllRequirements(schoolId: string): Promise<RegulatoryRequirement[]> {
    const { data, error } = await this.supabase
      .from(this.REQUIREMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('next_deadline', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getRequirementById(schoolId: string, id: string): Promise<RegulatoryRequirement | null> {
    const { data, error } = await this.supabase
      .from(this.REQUIREMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createRequirement(schoolId: string, requirement: CreateRegulatoryRequirement): Promise<RegulatoryRequirement> {
    const requirementCode = `REG-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.REQUIREMENTS_TABLE)
      .insert({
        requirement_code: requirementCode,
        ...requirement,
        status: 'active',
        compliance_status: 'pending_review',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateRequirement(schoolId: string, id: string, requirement: UpdateRegulatoryRequirement): Promise<RegulatoryRequirement> {
    const { data, error } = await this.supabase
      .from(this.REQUIREMENTS_TABLE)
      .update({ ...requirement, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteRequirement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.REQUIREMENTS_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async markCompliant(schoolId: string, id: string): Promise<RegulatoryRequirement> {
    return this.updateRequirement(schoolId, id, {
      compliance_status: 'compliant',
      last_checked: new Date().toISOString(),
    });
  }

  async markNonCompliant(schoolId: string, id: string): Promise<RegulatoryRequirement> {
    return this.updateRequirement(schoolId, id, {
      compliance_status: 'non_compliant',
      last_checked: new Date().toISOString(),
    });
  }

  async getByType(schoolId: string, regulationType: string): Promise<RegulatoryRequirement[]> {
    const { data, error } = await this.supabase
      .from(this.REQUIREMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('regulation_type', regulationType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUpcomingDeadlines(schoolId: string, days: number): Promise<RegulatoryRequirement[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    const { data, error } = await this.supabase
      .from(this.REQUIREMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .lte('next_deadline', futureDate.toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getNonCompliant(schoolId: string): Promise<RegulatoryRequirement[]> {
    const { data, error } = await this.supabase
      .from(this.REQUIREMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('compliance_status', 'non_compliant')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async createRecord(schoolId: string, requirementId: string, period: string, documents: string[], notes?: string): Promise<ComplianceRecord> {
    const { data, error } = await this.supabase
      .from(this.RECORDS_TABLE)
      .insert({
        requirement_id: requirementId,
        period,
        status: 'submitted',
        submission_date: new Date().toISOString(),
        documents,
        notes,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateRecord(schoolId: string, id: string, updates: Partial<ComplianceRecord>): Promise<ComplianceRecord> {
    const { data, error } = await this.supabase
      .from(this.RECORDS_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getRecords(schoolId: string, requirementId: string): Promise<ComplianceRecord[]> {
    const { data, error } = await this.supabase
      .from(this.RECORDS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('requirement_id', requirementId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getComplianceStats(schoolId: string): Promise<{ total: number; compliant: number; nonCompliant: number; pendingReview: number; upcomingDeadlines: number }> {
    const requirements = await this.getAllRequirements(schoolId);
    const upcomingDeadlines = await this.getUpcomingDeadlines(schoolId, 30);

    return {
      total: requirements.length,
      compliant: requirements.filter((r) => r.compliance_status === 'compliant').length,
      nonCompliant: requirements.filter((r) => r.compliance_status === 'non_compliant').length,
      pendingReview: requirements.filter((r) => r.compliance_status === 'pending_review').length,
      upcomingDeadlines: upcomingDeadlines.length,
    };
  }
}
