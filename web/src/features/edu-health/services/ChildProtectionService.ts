import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ChildProtectionCase {
  id: string;
  school_id: string;
  case_number: string;
  student_id: string;
  safeguarding_concern_id?: string;
  case_type: 'child_in_need' | 'child_protection' | 'looked_after' | 'adoption' | 'other';
  status: 'open' | 'active_plan' | 'under_review' | 'closed' | 'escalated';
  assigned_social_worker?: string;
  assigned_safeguarding_lead: string;
  initial_assessment_date: string;
  initial_assessment_outcome: string;
  risk_level: 'low' | 'moderate' | 'high' | 'very_high';
  risk_factors: string[];
  protective_factors: string[];
  family_members: FamilyMember[];
  care_plan?: CarePlan;
  review_dates: string[];
  last_review_date?: string;
  next_review_date?: string;
  lAC_status: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  contact?: string;
  role_in_case: string;
}

export interface CarePlan {
  id: string;
  objectives: string[];
  actions: CarePlanAction[];
  responsible_parties: string[];
  review_date: string;
}

export interface CarePlanAction {
  id: string;
  description: string;
  responsible: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface CreateChildProtectionCase {
  student_id: string;
  safeguarding_concern_id?: string;
  case_type: 'child_in_need' | 'child_protection' | 'looked_after' | 'adoption' | 'other';
  assigned_safeguarding_lead: string;
  initial_assessment_date: string;
  initial_assessment_outcome: string;
  risk_level: 'low' | 'moderate' | 'high' | 'very_high';
  risk_factors?: string[];
  protective_factors?: string[];
  family_members?: FamilyMember[];
  metadata?: Record<string, unknown>;
}

export interface UpdateChildProtectionCase {
  status?: string;
  assigned_social_worker?: string;
  risk_level?: string;
  risk_factors?: string[];
  protective_factors?: string[];
  family_members?: FamilyMember[];
  care_plan?: CarePlan;
  review_dates?: string[];
  last_review_date?: string;
  next_review_date?: string;
  lAC_status?: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class ChildProtectionService {
  private readonly TABLE = 'child_protection_cases';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ChildProtectionCase[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ChildProtectionCase | null> {
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

  async create(schoolId: string, caseData: CreateChildProtectionCase): Promise<ChildProtectionCase> {
    const caseNumber = `CPC-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        case_number: caseNumber,
        ...caseData,
        status: 'open',
        risk_factors: caseData.risk_factors || [],
        protective_factors: caseData.protective_factors || [],
        family_members: caseData.family_members || [],
        review_dates: [],
        lAC_status: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, caseData: UpdateChildProtectionCase): Promise<ChildProtectionCase> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...caseData, updated_at: new Date().toISOString() })
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

  async escalate(schoolId: string, id: string, socialWorker: string): Promise<ChildProtectionCase> {
    return this.update(schoolId, id, {
      status: 'escalated',
      assigned_social_worker: socialWorker,
    });
  }

  async addReview(schoolId: string, id: string): Promise<ChildProtectionCase> {
    const caseRecord = await this.getById(schoolId, id);
    if (!caseRecord) throw new Error('Case not found');

    return this.update(schoolId, id, {
      review_dates: [...caseRecord.review_dates, new Date().toISOString()],
      last_review_date: new Date().toISOString(),
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<ChildProtectionCase[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<ChildProtectionCase[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('status', 'in', ['closed'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getHighRisk(schoolId: string): Promise<ChildProtectionCase[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('risk_level', ['high', 'very_high'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReview(schoolId: string): Promise<ChildProtectionCase[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('status', 'in', ['closed'])
      .not('next_review_date', 'is', null)
      .lte('next_review_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    highRisk: number;
    lAC: number;
    pendingReview: number;
  }> {
    const cases = await this.getAll(schoolId);
    return {
      total: cases.length,
      active: cases.filter((c) => c.status !== 'closed').length,
      highRisk: cases.filter((c) => c.risk_level === 'high' || c.risk_level === 'very_high').length,
      lAC: cases.filter((c) => c.lAC_status).length,
      pendingReview: cases.filter(
        (c) => c.next_review_date && c.next_review_date <= new Date().toISOString().split('T')[0]
      ).length,
    };
  }
}
