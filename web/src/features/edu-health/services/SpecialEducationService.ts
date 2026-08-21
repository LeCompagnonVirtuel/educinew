import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SpecialEducationPlan {
  id: string;
  school_id: string;
  plan_number: string;
  student_id: string;
  plan_type: 'IEP' | '504' | 'behavior_plan' | 'transition' | 'other';
  status: 'draft' | 'active' | 'under_review' | 'expired' | 'archived';
  created_by: string;
  eligibility_date: string;
  review_date: string;
  expiration_date: string;
  present_levels: PresentLevel[];
  annual_goals: AnnualGoal[];
  services: SpecialEducationService[];
  accommodations: string[];
  modifications: string[];
  assessment_modifications: string[];
  placement: string;
  lREP: string;
  transition_plan?: TransitionPlan;
  parent_participation: ParentParticipation;
  meeting_dates: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PresentLevel {
  id: string;
  area: string;
  current_performance: string;
  impact_on_learning: string;
}

export interface AnnualGoal {
  id: string;
  description: string;
  short_term_objectives: string[];
  measurement: string;
  target_date: string;
  status: 'not_started' | 'in_progress' | 'met' | 'not_met';
  progress_percentage: number;
}

export interface SpecialEducationService {
  id: string;
  service_type: string;
  provider: string;
  frequency: string;
  duration_minutes: number;
  location: string;
  start_date: string;
  end_date?: string;
}

export interface TransitionPlan {
  id: string;
  post_secondary_goals: string[];
  transition_services: string[];
  community_experiences: string;
  employment_goals: string;
  independent_living_skills: string[];
}

export interface ParentParticipation {
  parent_invited: boolean;
  parent_attended: boolean;
  parent_consent: boolean;
  interpreters_needed: boolean;
  additional_invited_parties: string[];
}

export interface CreateSpecialEducationPlan {
  student_id: string;
  plan_type: 'IEP' | '504' | 'behavior_plan' | 'transition' | 'other';
  created_by: string;
  eligibility_date: string;
  review_date: string;
  expiration_date: string;
  placement?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateSpecialEducationPlan {
  status?: string;
  present_levels?: PresentLevel[];
  annual_goals?: AnnualGoal[];
  services?: SpecialEducationService[];
  accommodations?: string[];
  modifications?: string[];
  assessment_modifications?: string[];
  placement?: string;
  lREP?: string;
  transition_plan?: TransitionPlan;
  parent_participation?: ParentParticipation;
  meeting_dates?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class SpecialEducationService {
  private readonly TABLE = 'special_education_plans';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SpecialEducationPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SpecialEducationPlan | null> {
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

  async create(schoolId: string, plan: CreateSpecialEducationPlan): Promise<SpecialEducationPlan> {
    const planNumber = `SEP-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        plan_number: planNumber,
        ...plan,
        status: 'draft',
        present_levels: [],
        annual_goals: [],
        services: [],
        accommodations: [],
        modifications: [],
        assessment_modifications: [],
        meeting_dates: [],
        parent_participation: {
          parent_invited: false,
          parent_attended: false,
          parent_consent: false,
          interpreters_needed: false,
          additional_invited_parties: [],
        },
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, plan: UpdateSpecialEducationPlan): Promise<SpecialEducationPlan> {
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

  async addGoal(schoolId: string, id: string, goal: AnnualGoal): Promise<SpecialEducationPlan> {
    const plan = await this.getById(schoolId, id);
    if (!plan) throw new Error('Plan not found');

    return this.update(schoolId, id, {
      annual_goals: [...plan.annual_goals, goal],
    });
  }

  async updateGoalProgress(schoolId: string, planId: string, goalId: string, progress: number): Promise<SpecialEducationPlan> {
    const plan = await this.getById(schoolId, planId);
    if (!plan) throw new Error('Plan not found');

    const updatedGoals = plan.annual_goals.map((g) =>
      g.id === goalId
        ? { ...g, progress_percentage: progress, status: progress >= 100 ? 'met' : 'in_progress' }
        : g
    );

    return this.update(schoolId, planId, { annual_goals: updatedGoals });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<SpecialEducationPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<SpecialEducationPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReview(schoolId: string): Promise<SpecialEducationPlan[]> {
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

  async getExpired(schoolId: string): Promise<SpecialEducationPlan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .lt('expiration_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    pendingReview: number;
    expired: number;
    goalsMet: number;
    totalGoals: number;
  }> {
    const plans = await this.getAll(schoolId);
    const allGoals = plans.flatMap((p) => p.annual_goals);

    return {
      total: plans.length,
      active: plans.filter((p) => p.status === 'active').length,
      pendingReview: plans.filter(
        (p) => p.status === 'active' && p.review_date <= new Date().toISOString().split('T')[0]
      ).length,
      expired: plans.filter(
        (p) => p.status === 'active' && p.expiration_date < new Date().toISOString().split('T')[0]
      ).length,
      goalsMet: allGoals.filter((g) => g.status === 'met').length,
      totalGoals: allGoals.length,
    };
  }
}
