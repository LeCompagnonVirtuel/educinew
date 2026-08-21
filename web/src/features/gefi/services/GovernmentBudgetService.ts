import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface GovernmentBudget {
  id: string;
  school_id: string;
  budget_code: string;
  name: string;
  description: string;
  fiscal_year: number;
  ministry: string;
  program_code: string;
  total_allocation: number;
  released_amount: number;
  spent_amount: number;
  remaining_amount: number;
  currency: string;
  status: 'proposed' | 'approved' | 'active' | 'suspended' | 'closed';
  source: 'ministry' | 'regional' | 'municipal' | 'international';
  conditions?: Record<string, unknown>;
  reporting_requirements?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateGovernmentBudget {
  budget_code: string;
  name: string;
  description: string;
  fiscal_year: number;
  ministry: string;
  program_code: string;
  total_allocation: number;
  currency?: string;
  source: 'ministry' | 'regional' | 'municipal' | 'international';
  conditions?: Record<string, unknown>;
  reporting_requirements?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateGovernmentBudget {
  name?: string;
  description?: string;
  total_allocation?: number;
  status?: string;
  conditions?: Record<string, unknown>;
  reporting_requirements?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class GovernmentBudgetService {
  private readonly TABLE = 'government_budgets';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<GovernmentBudget[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('fiscal_year', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<GovernmentBudget | null> {
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

  async create(schoolId: string, budget: CreateGovernmentBudget): Promise<GovernmentBudget> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...budget,
        released_amount: 0,
        spent_amount: 0,
        remaining_amount: budget.total_allocation,
        currency: budget.currency || 'XOF',
        status: 'proposed',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, budget: UpdateGovernmentBudget): Promise<GovernmentBudget> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...budget, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string): Promise<GovernmentBudget> {
    return this.update(schoolId, id, { status: 'approved' });
  }

  async activate(schoolId: string, id: string): Promise<GovernmentBudget> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async recordRelease(schoolId: string, id: string, amount: number): Promise<GovernmentBudget> {
    const budget = await this.getById(schoolId, id);
    if (!budget) throw new Error('Budget not found');

    return this.update(schoolId, id, {
      released_amount: budget.released_amount + amount,
      remaining_amount: budget.total_allocation - budget.released_amount - amount,
    });
  }

  async recordSpending(schoolId: string, id: string, amount: number): Promise<GovernmentBudget> {
    const budget = await this.getById(schoolId, id);
    if (!budget) throw new Error('Budget not found');

    return this.update(schoolId, id, {
      spent_amount: budget.spent_amount + amount,
    });
  }

  async getByFiscalYear(schoolId: string, fiscalYear: number): Promise<GovernmentBudget[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('fiscal_year', fiscalYear)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByMinistry(schoolId: string, ministry: string): Promise<GovernmentBudget[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry', ministry)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<GovernmentBudget[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUtilizationRate(schoolId: string, id: string): Promise<number> {
    const budget = await this.getById(schoolId, id);
    if (!budget || budget.released_amount === 0) return 0;
    return (budget.spent_amount / budget.released_amount) * 100;
  }
}
