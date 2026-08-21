import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface FamilySupport {
  id: string;
  school_id: string;
  support_number: string;
  family_id: string;
  primary_student_id: string;
  support_type: 'parenting' | 'financial' | 'housing' | 'health' | 'education' | 'legal' | 'other';
  status: 'identified' | 'assessment' | 'plan' | 'in_progress' | 'resolved' | 'closed';
  identified_by: string;
  date_identified: string;
  family_members: FamilyMemberEntry[];
  assessment?: FamilyAssessment;
  action_plan?: FamilyActionPlan;
  services_provided: FamilyService[];
  external_agencies: ExternalAgencyEntry[];
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface FamilyMemberEntry {
  id: string;
  name: string;
  relationship: string;
  age?: number;
  role: string;
}

export interface FamilyAssessment {
  id: string;
  strengths: string[];
  needs: string[];
  risks: string[];
  protective_factors: string[];
  assessment_date: string;
  assessed_by: string;
}

export interface FamilyActionPlan {
  id: string;
  goals: string[];
  actions: FamilyAction[];
  timeline: string;
}

export interface FamilyAction {
  id: string;
  description: string;
  responsible: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface FamilyService {
  id: string;
  service_type: string;
  provider: string;
  start_date: string;
  end_date?: string;
  status: 'active' | 'completed' | 'discontinued';
}

export interface ExternalAgencyEntry {
  id: string;
  name: string;
  contact: string;
  service_type: string;
}

export interface CreateFamilySupport {
  family_id: string;
  primary_student_id: string;
  support_type: 'parenting' | 'financial' | 'housing' | 'health' | 'education' | 'legal' | 'other';
  identified_by: string;
  family_members?: FamilyMemberEntry[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateFamilySupport {
  status?: string;
  family_members?: FamilyMemberEntry[];
  assessment?: FamilyAssessment;
  action_plan?: FamilyActionPlan;
  services_provided?: FamilyService[];
  external_agencies?: ExternalAgencyEntry[];
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class FamilySupportService {
  private readonly TABLE = 'family_supports';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<FamilySupport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<FamilySupport | null> {
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

  async create(schoolId: string, support: CreateFamilySupport): Promise<FamilySupport> {
    const supportNumber = `FS-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        support_number: supportNumber,
        ...support,
        status: 'identified',
        date_identified: new Date().toISOString(),
        family_members: support.family_members || [],
        services_provided: [],
        external_agencies: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, support: UpdateFamilySupport): Promise<FamilySupport> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...support, updated_at: new Date().toISOString() })
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

  async getByFamily(schoolId: string, familyId: string): Promise<FamilySupport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('family_id', familyId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, supportType: string): Promise<FamilySupport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('support_type', supportType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<FamilySupport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('status', 'in', ['resolved', 'closed'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    resolved: number;
    byType: Record<string, number>;
  }> {
    const supports = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    supports.forEach((s) => {
      byType[s.support_type] = (byType[s.support_type] || 0) + 1;
    });

    return {
      total: supports.length,
      active: supports.filter((s) => !['resolved', 'closed'].includes(s.status)).length,
      resolved: supports.filter((s) => s.status === 'resolved' || s.status === 'closed').length,
      byType,
    };
  }
}
