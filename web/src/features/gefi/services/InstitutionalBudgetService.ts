import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface InstitutionalBudget {
  id: string;
  school_id: string;
  budget_code: string;
  name: string;
  description: string;
  fiscal_year: number;
  period: 'annual' | 'quarterly' | 'monthly';
  total_amount: number;
  allocated_amount: number;
  spent_amount: number;
  remaining_amount: number;
  currency: string;
  status: 'draft' | 'proposed' | 'approved' | 'active' | 'closed';
  approved_by?: string;
  approved_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface BudgetLine {
  id: string;
  budget_id: string;
  line_number: number;
  category: string;
  description: string;
  amount: number;
  spent: number;
  remaining: number;
  department?: string;
  notes?: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInstitutionalBudget {
  budget_code: string;
  name: string;
  description: string;
  fiscal_year: number;
  period: 'annual' | 'quarterly' | 'monthly';
  total_amount: number;
  currency?: string;
  lines: Omit<BudgetLine, 'id' | 'budget_id' | 'created_at' | 'updated_at' | 'school_id'>[];
  metadata?: Record<string, unknown>;
}

export interface UpdateInstitutionalBudget {
  name?: string;
  description?: string;
  total_amount?: number;
  status?: 'draft' | 'proposed' | 'approved' | 'active' | 'closed';
  metadata?: Record<string, unknown>;
}

export class InstitutionalBudgetService {
  private readonly TABLE = 'institutional_budgets';
  private readonly LINES_TABLE = 'budget_lines';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<InstitutionalBudget[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('fiscal_year', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<InstitutionalBudget | null> {
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

  async create(schoolId: string, budget: CreateInstitutionalBudget): Promise<InstitutionalBudget> {
    const totalSpent = budget.lines.reduce((sum, l) => sum + l.spent, 0);
    const totalAllocated = budget.lines.reduce((sum, l) => sum + l.amount, 0);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...budget,
        allocated_amount: totalAllocated,
        spent_amount: totalSpent,
        remaining_amount: budget.total_amount - totalSpent,
        currency: budget.currency || 'XOF',
        status: 'draft',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;

    const linesWithBudgetId = budget.lines.map((line, index) => ({
      ...line,
      budget_id: data.id,
      line_number: index + 1,
      remaining: line.amount - line.spent,
      school_id: schoolId,
    }));

    await this.supabase.from(this.LINES_TABLE).insert(linesWithBudgetId);

    return data;
  }

  async update(schoolId: string, id: string, budget: UpdateInstitutionalBudget): Promise<InstitutionalBudget> {
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

  async approve(schoolId: string, id: string, approvedBy: string): Promise<InstitutionalBudget> {
    return this.update(schoolId, id, {
      status: 'approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
    });
  }

  async activate(schoolId: string, id: string): Promise<InstitutionalBudget> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async close(schoolId: string, id: string): Promise<InstitutionalBudget> {
    return this.update(schoolId, id, { status: 'closed' });
  }

  async getLines(schoolId: string, budgetId: string): Promise<BudgetLine[]> {
    const { data, error } = await this.supabase
      .from(this.LINES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('budget_id', budgetId)
      .order('line_number');

    if (error) throw error;
    return data || [];
  }

  async getActiveBudget(schoolId: string): Promise<InstitutionalBudget | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async getByFiscalYear(schoolId: string, fiscalYear: number): Promise<InstitutionalBudget[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('fiscal_year', fiscalYear)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUtilizationRate(schoolId: string, budgetId: string): Promise<number> {
    const budget = await this.getById(schoolId, budgetId);
    if (!budget || budget.total_amount === 0) return 0;
    return (budget.spent_amount / budget.total_amount) * 100;
  }
}
