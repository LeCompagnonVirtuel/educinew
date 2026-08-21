import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface GovernmentDisbursement {
  id: string;
  school_id: string;
  disbursement_number: string;
  budget_id: string;
  allocation_id?: string;
  amount: number;
  currency: string;
  disbursement_type: 'initial' | 'tranche' | 'final' | 'supplementary';
  tranche_number?: number;
  total_tranches?: number;
  status: 'requested' | 'approved' | 'processing' | 'completed' | 'failed' | 'reversed';
  request_date: string;
  expected_date?: string;
  completed_date?: string;
  bank_account?: Record<string, unknown>;
  reference?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateGovernmentDisbursement {
  budget_id: string;
  allocation_id?: string;
  amount: number;
  currency?: string;
  disbursement_type: 'initial' | 'tranche' | 'final' | 'supplementary';
  tranche_number?: number;
  total_tranches?: number;
  expected_date?: string;
  bank_account?: Record<string, unknown>;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateGovernmentDisbursement {
  status?: string;
  completed_date?: string;
  reference?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class GovernmentDisbursementService {
  private readonly TABLE = 'government_disbursements';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<GovernmentDisbursement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<GovernmentDisbursement | null> {
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

  async create(schoolId: string, disbursement: CreateGovernmentDisbursement): Promise<GovernmentDisbursement> {
    const disbursementNumber = `GD-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        disbursement_number: disbursementNumber,
        ...disbursement,
        currency: disbursement.currency || 'XOF',
        status: 'requested',
        request_date: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, disbursement: UpdateGovernmentDisbursement): Promise<GovernmentDisbursement> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...disbursement, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string): Promise<GovernmentDisbursement> {
    return this.update(schoolId, id, { status: 'approved' });
  }

  async complete(schoolId: string, id: string, reference: string): Promise<GovernmentDisbursement> {
    return this.update(schoolId, id, {
      status: 'completed',
      completed_date: new Date().toISOString(),
      reference,
    });
  }

  async fail(schoolId: string, id: string, notes: string): Promise<GovernmentDisbursement> {
    return this.update(schoolId, id, { status: 'failed', notes });
  }

  async reverse(schoolId: string, id: string, notes: string): Promise<GovernmentDisbursement> {
    return this.update(schoolId, id, { status: 'reversed', notes });
  }

  async getByBudget(schoolId: string, budgetId: string): Promise<GovernmentDisbursement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('budget_id', budgetId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByStatus(schoolId: string, status: string): Promise<GovernmentDisbursement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<GovernmentDisbursement[]> {
    return this.getByStatus(schoolId, 'requested');
  }

  async getTotalDisbursed(schoolId: string, budgetId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('amount')
      .eq('school_id', schoolId)
      .eq('budget_id', budgetId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).reduce((sum, d) => sum + d.amount, 0);
  }
}
