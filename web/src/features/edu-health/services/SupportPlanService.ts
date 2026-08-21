import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SupportPlan {
  id: string;
  school_id: string;
  plan_number: string;
  student_id: string;
  plan_type: 'academic' | 'behavioral' | 'emotional' | 'social' | 'comprehensive';
  status: 'draft' | 'active' | 'under_review' | 'completed' | 'archived';
  created_by: string;
  review_date: string;
  goals: SupportGoal[];
  interventions: SupportIntervention[];
  team_members: TeamMember[];
  progress_notes: ProgressNote[];
  measurable_outcomes: string[];
  start_date: string;
  end_date?: string;
  parent_consent: boolean;
  student_input?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SupportGoal {
  id: string;
  description: string;
  target_date: string;
  status: 'not_started' | 'in_progress' | 'achieved' | 'not_achieved';
  progress_percentage: number;
}

export interface SupportIntervention {
  id: string;
  description: string;
  responsible: string;
  frequency: string;
  status: 'active' | 'completed' | 'discontinued';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  responsibilities: string[];
}

export interface ProgressNote {
  id: string;
  date: string;
  author: string;
  content: string;
  goal_id?: string;
}

export interface CreateSupportPlan {
  student_id: string;
  plan_type: 'academic' | 'behavioral' | 'emotional' | 'social' | 'comprehensive';
  created_by: string;
  review_date: string;
  goals?: SupportGoal[];
  interventions?: SupportIntervention[];
  team_members?: TeamMember[];
  measurable_outcomes?: string[];
  start_date: string;
  end_date?: string;
  parent_consent?: boolean;
  metadata?: Record<string, unknown>;
}

export interface UpdateSupportPlan {
  status?: string;
  review_date?: string;
  goals?: SupportGoal[];
  interventions?: SupportIntervention[];
  team_members?: TeamMember[];
  progress_notes?: ProgressNote[];
  measurable_outcomes?: string[];
  end_date?: string;
  parent_consent?: boolean;
  student_input?: string;
  metadata?: Record<string, unknown>;
}

export class SupportPlanService {
  private readonly TABLE = 'support_plans';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SupportPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SupportPlan | null> {
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

  async create(schoolId: string, plan: CreateSupportPlan): Promise<SupportPlan> {
    const planNumber = `SP-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        plan_number: planNumber,
        ...plan,
        status: 'draft',
        goals: plan.goals || [],
        interventions: plan.interventions || [],
        team_members: plan.team_members || [],
        progress_notes: [],
        measurable_outcomes: plan.measurable_outcomes || [],
        parent_consent: plan.parent_consent ?? false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, plan: UpdateSupportPlan): Promise<SupportPlan> {
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

  async activate(schoolId: string, id: string): Promise<SupportPlan> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async addProgressNote(schoolId: string, id: string, note: ProgressNote): Promise<SupportPlan> {
    const plan = await this.getById(schoolId, id);
    if (!plan) throw new Error('Support plan not found');

    return this.update(schoolId, id, {
      progress_notes: [...plan.progress_notes, note],
    });
  }

  async updateGoalProgress(schoolId: string, planId: string, goalId: string, progress: number): Promise<SupportPlan> {
    const plan = await this.getById(schoolId, planId);
    if (!plan) throw new Error('Support plan not found');

    const updatedGoals = plan.goals.map((g) =>
      g.id === goalId
        ? { ...g, progress_percentage: progress, status: progress >= 100 ? 'achieved' : 'in_progress' }
        : g
    );

    return this.update(schoolId, planId, { goals: updatedGoals });
  }

  async getActive(schoolId: string): Promise<SupportPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByStudent(schoolId: string, studentId: string): Promise<SupportPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReview(schoolId: string): Promise<SupportPlan[]> {
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
    completed: number;
    pendingReview: number;
    goalsAchieved: number;
  }> {
    const plans = await this.getAll(schoolId);
    const active = plans.filter((p) => p.status === 'active');
    const allGoals = plans.flatMap((p) => p.goals);

    return {
      total: plans.length,
      active: active.length,
      draft: plans.filter((p) => p.status === 'draft').length,
      completed: plans.filter((p) => p.status === 'completed').length,
      pendingReview: plans.filter(
        (p) => p.status === 'active' && p.review_date <= new Date().toISOString().split('T')[0]
      ).length,
      goalsAchieved: allGoals.filter((g) => g.status === 'achieved').length,
    };
  }
}
