import type { SupabaseClient } from '@supabase/supabase-js';

interface WorkforcePlan {
  id: string;
  school_id: string;
  title: string;
  description?: string;
  department?: string;
  period_start: string;
  period_end: string;
  headcount_target: number;
  current_headcount: number;
  hiring_budget?: number;
  skills_required: string[];
  status: 'draft' | 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

interface WorkforcePlanCreate {
  title: string;
  description?: string;
  department?: string;
  period_start: string;
  period_end: string;
  headcount_target: number;
  hiring_budget?: number;
  skills_required?: string[];
}

interface WorkforceGap {
  skill: string;
  required: number;
  current: number;
  gap: number;
}

interface WorkforceFilters {
  department?: string;
  status?: string;
  period_start?: string;
  period_end?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class WorkforcePlanningService {
  private readonly TABLE = 'gewlp_workforce_plans';

  constructor(private supabase: SupabaseClient) {}

  async getPlan(schoolId: string, id: string): Promise<WorkforcePlan> {
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

  async listPlans(schoolId: string, filters?: WorkforceFilters): Promise<WorkforcePlan[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.department) query = query.eq('department', filters.department);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.period_start) query = query.gte('period_start', filters.period_start);
    if (filters?.period_end) query = query.lte('period_end', filters.period_end);
    if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createPlan(schoolId: string, data: WorkforcePlanCreate): Promise<WorkforcePlan> {
    const { data: plan, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        current_headcount: 0,
        skills_required: data.skills_required ?? [],
        status: 'draft',
      })
      .select()
      .single();
    if (error) throw error;
    return plan;
  }

  async updatePlan(schoolId: string, id: string, data: Partial<WorkforcePlanCreate>): Promise<WorkforcePlan> {
    const existing = await this.getPlan(schoolId, id);
    if (!existing) throw new Error(`Workforce plan ${id} not found`);

    const { data: plan, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return plan;
  }

  async deletePlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.getPlan(schoolId, id);
    if (!existing) throw new Error(`Workforce plan ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async activatePlan(schoolId: string, id: string): Promise<WorkforcePlan> {
    return this.updatePlan(schoolId, id, { status: 'active' } as Partial<WorkforcePlanCreate>);
  }

  async completePlan(schoolId: string, id: string): Promise<WorkforcePlan> {
    return this.updatePlan(schoolId, id, { status: 'completed' } as Partial<WorkforcePlanCreate>);
  }

  async analyzeGap(schoolId: string, planId: string, currentSkillCounts: Record<string, number>): Promise<WorkforceGap[]> {
    const plan = await this.getPlan(schoolId, planId);
    if (!plan) throw new Error(`Workforce plan ${planId} not found`);

    return plan.skills_required.map(skill => ({
      skill,
      required: Math.ceil(plan.headcount_target / plan.skills_required.length),
      current: currentSkillCounts[skill] ?? 0,
      gap: Math.max(0, Math.ceil(plan.headcount_target / plan.skills_required.length) - (currentSkillCounts[skill] ?? 0)),
    }));
  }

  async getActivePlans(schoolId: string, department?: string): Promise<WorkforcePlan[]> {
    return this.listPlans(schoolId, { department, status: 'active' });
  }
}
