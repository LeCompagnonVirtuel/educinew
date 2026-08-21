import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Settlement {
  id: string;
  school_id: string;
  settlement_number: string;
  reconciliation_job_id: string;
  settlement_date: string;
  total_amount: number;
  currency: string;
  parties: SettlementParty[];
  status: 'pending' | 'approved' | 'processing' | 'completed' | 'failed';
  payment_method: string;
  payment_reference?: string;
  approved_by?: string;
  approved_at?: string;
  completed_at?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SettlementParty {
  party_id: string;
  party_name: string;
  party_type: 'institution' | 'vendor' | 'government' | 'donor' | 'other';
  amount: number;
  direction: 'pay' | 'receive';
  account_reference: string;
}

export interface CreateSettlement {
  reconciliation_job_id: string;
  settlement_date: string;
  total_amount: number;
  currency?: string;
  parties: SettlementParty[];
  payment_method: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateSettlement {
  status?: string;
  payment_reference?: string;
  approved_by?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class SettlementService {
  private readonly TABLE = 'settlements';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Settlement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Settlement | null> {
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

  async create(schoolId: string, settlement: CreateSettlement): Promise<Settlement> {
    const settlementNumber = `STL-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        settlement_number: settlementNumber,
        ...settlement,
        currency: settlement.currency || 'XOF',
        status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, settlement: UpdateSettlement): Promise<Settlement> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...settlement, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string, approvedBy: string): Promise<Settlement> {
    return this.update(schoolId, id, {
      status: 'approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
    });
  }

  async process(schoolId: string, id: string): Promise<Settlement> {
    return this.update(schoolId, id, { status: 'processing' });
  }

  async complete(schoolId: string, id: string, paymentReference: string): Promise<Settlement> {
    return this.update(schoolId, id, {
      status: 'completed',
      payment_reference: paymentReference,
      completed_at: new Date().toISOString(),
    });
  }

  async fail(schoolId: string, id: string, notes: string): Promise<Settlement> {
    return this.update(schoolId, id, { status: 'failed', notes });
  }

  async getByStatus(schoolId: string, status: string): Promise<Settlement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<Settlement[]> {
    return this.getByStatus(schoolId, 'pending');
  }

  async getByJob(schoolId: string, jobId: string): Promise<Settlement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('reconciliation_job_id', jobId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByDateRange(schoolId: string, startDate: string, endDate: string): Promise<Settlement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .gte('settlement_date', startDate)
      .lte('settlement_date', endDate)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getTotalSettled(schoolId: string, startDate: string, endDate: string): Promise<number> {
    const settlements = await this.getByDateRange(schoolId, startDate, endDate);
    return settlements
      .filter((s) => s.status === 'completed')
      .reduce((sum, s) => sum + s.total_amount, 0);
  }

  async getStats(schoolId: string): Promise<{ total: number; pending: number; completed: number; totalAmount: number }> {
    const settlements = await this.getAll(schoolId);
    return {
      total: settlements.length,
      pending: settlements.filter((s) => s.status === 'pending').length,
      completed: settlements.filter((s) => s.status === 'completed').length,
      totalAmount: settlements.reduce((sum, s) => sum + s.total_amount, 0),
    };
  }
}
