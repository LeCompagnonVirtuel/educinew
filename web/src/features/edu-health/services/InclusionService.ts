import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface InclusionPlan {
  id: string;
  school_id: string;
  plan_number: string;
  student_id: string;
  plan_type: 'academic' | 'social' | 'behavioral' | 'comprehensive';
  status: 'draft' | 'active' | 'under_review' | 'completed' | 'archived';
  created_by: string;
  start_date: string;
  end_date?: string;
  goals: InclusionGoal[];
  strategies: InclusionStrategy[];
  accommodations: string[];
  modifications: string[];
  support_services: SupportService[];
  progress_monitoring: ProgressMonitoring[];
  review_dates: string[];
  parent_consent: boolean;
  student_voice?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface InclusionGoal {
  id: string;
  area: string;
  description: string;
  target_date: string;
  status: 'not_started' | 'in_progress' | 'achieved' | 'not_achieved';
  progress_percentage: number;
}

export interface InclusionStrategy {
  id: string;
  strategy: string;
  implementation: string;
  responsible: string;
  frequency: string;
}

export interface SupportService {
  id: string;
  service_type: string;
  provider: string;
  frequency: string;
  status: 'active' | 'inactive' | 'requested';
}

export interface ProgressMonitoring {
  id: string;
  date: string;
  metric: string;
  value: number;
  notes?: string;
}

export interface CreateInclusionPlan {
  student_id: string;
  plan_type: 'academic' | 'social' | 'behavioral' | 'comprehensive';
  created_by: string;
  start_date: string;
  end_date?: string;
  goals?: InclusionGoal[];
  strategies?: InclusionStrategy[];
  accommodations?: string[];
  modifications?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateInclusionPlan {
  status?: string;
  goals?: InclusionGoal[];
  strategies?: InclusionStrategy[];
  accommodations?: string[];
  modifications?: string[];
  support_services?: SupportService[];
  progress_monitoring?: ProgressMonitoring[];
  review_dates?: string[];
  parent_consent?: boolean;
  student_voice?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class InclusionService {
  private readonly TABLE = 'inclusion_plans';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<InclusionPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<InclusionPlan | null> {
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

  async create(schoolId: string, plan: CreateInclusionPlan): Promise<InclusionPlan> {
    const planNumber = `INCL-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        plan_number: planNumber,
        ...plan,
        status: 'draft',
        goals: plan.goals || [],
        strategies: plan.strategies || [],
        accommodations: plan.accommodations || [],
        modifications: plan.modifications || [],
        support_services: [],
        progress_monitoring: [],
        review_dates: [],
        parent_consent: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, plan: UpdateInclusionPlan): Promise<InclusionPlan> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...plan, updated_at: new Date().toISOString() })
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

  async activate(schoolId: string, id: string): Promise<InclusionPlan> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async addProgressMonitoring(schoolId: string, id: string, monitoring: ProgressMonitoring): Promise<InclusionPlan> {
    const plan = await this.getById(schoolId, id);
    if (!plan) throw new Error('Plan not found');

    return this.update(schoolId, id, {
      progress_monitoring: [...plan.progress_monitoring, monitoring],
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<InclusionPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<InclusionPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReview(schoolId: string): Promise<InclusionPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;

    return (data || []).filter((p) =>
      p.review_dates.some((d) => d <= new Date().toISOString().split('T')[0])
    );
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    draft: number;
    completed: number;
    goalsAchieved: number;
  }> {
    const plans = await this.getAll(schoolId);
    const allGoals = plans.flatMap((p) => p.goals);

    return {
      total: plans.length,
      active: plans.filter((p) => p.status === 'active').length,
      draft: plans.filter((p) => p.status === 'draft').length,
      completed: plans.filter((p) => p.status === 'completed').length,
      goalsAchieved: allGoals.filter((g) => g.status === 'achieved').length,
    };
  }
}
