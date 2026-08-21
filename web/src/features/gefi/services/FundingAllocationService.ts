import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface FundingAllocation {
  id: string;
  school_id: string;
  allocation_code: string;
  budget_id: string;
  department_id?: string;
  project_id?: string;
  amount: number;
  currency: string;
  purpose: string;
  period_start: string;
  period_end: string;
  status: 'pending' | 'approved' | 'active' | 'completed' | 'cancelled';
  approved_by?: string;
  approved_at?: string;
  spent_amount: number;
  remaining_amount: number;
  conditions?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateFundingAllocation {
  budget_id: string;
  department_id?: string;
  project_id?: string;
  amount: number;
  currency?: string;
  purpose: string;
  period_start: string;
  period_end: string;
  conditions?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateFundingAllocation {
  amount?: number;
  purpose?: string;
  status?: string;
  conditions?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class FundingAllocationService {
  private readonly TABLE = 'funding_allocations';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<FundingAllocation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<FundingAllocation | null> {
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

  async create(schoolId: string, allocation: CreateFundingAllocation): Promise<FundingAllocation> {
    const allocationCode = `FA-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        allocation_code: allocationCode,
        ...allocation,
        currency: allocation.currency || 'XOF',
        spent_amount: 0,
        remaining_amount: allocation.amount,
        status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, allocation: UpdateFundingAllocation): Promise<FundingAllocation> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...allocation, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string, approvedBy: string): Promise<FundingAllocation> {
    return this.update(schoolId, id, {
      status: 'approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
    });
  }

  async activate(schoolId: string, id: string): Promise<FundingAllocation> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async recordSpending(schoolId: string, id: string, amount: number): Promise<FundingAllocation> {
    const allocation = await this.getById(schoolId, id);
    if (!allocation) throw new Error('Allocation not found');

    const newSpent = allocation.spent_amount + amount;
    const newRemaining = allocation.amount - newSpent;

    return this.update(schoolId, id, {
      spent_amount: newSpent,
      remaining_amount: Math.max(0, newRemaining),
      status: newRemaining <= 0 ? 'completed' : allocation.status,
    });
  }

  async getByBudget(schoolId: string, budgetId: string): Promise<FundingAllocation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('budget_id', budgetId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByDepartment(schoolId: string, departmentId: string): Promise<FundingAllocation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('department_id', departmentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<FundingAllocation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getTotalAllocated(schoolId: string, budgetId: string): Promise<number> {
    const allocations = await this.getByBudget(schoolId, budgetId);
    return allocations.reduce((sum, a) => sum + a.amount, 0);
  }

  async getTotalSpent(schoolId: string, budgetId: string): Promise<number> {
    const allocations = await this.getByBudget(schoolId, budgetId);
    return allocations.reduce((sum, a) => sum + a.spent_amount, 0);
  }
}
