import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ScholarshipDisbursement {
  id: string;
  school_id: string;
  disbursement_number: string;
  program_id: string;
  application_id: string;
  student_id: string;
  wallet_id?: string;
  amount: number;
  currency: string;
  disbursement_type: 'full' | 'partial' | 'installment';
  installment_number?: number;
  total_installments?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'reversed';
  disbursement_date: string;
  completed_at?: string;
  payment_method?: string;
  transaction_id?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateScholarshipDisbursement {
  program_id: string;
  application_id: string;
  student_id: string;
  wallet_id?: string;
  amount: number;
  currency?: string;
  disbursement_type: 'full' | 'partial' | 'installment';
  installment_number?: number;
  total_installments?: number;
  disbursement_date: string;
  payment_method?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateScholarshipDisbursement {
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'reversed';
  completed_at?: string;
  transaction_id?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class ScholarshipDisbursementService {
  private readonly TABLE = 'scholarship_disbursements';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ScholarshipDisbursement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ScholarshipDisbursement | null> {
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

  async create(schoolId: string, disbursement: CreateScholarshipDisbursement): Promise<ScholarshipDisbursement> {
    const disbursementNumber = `SCH-DIS-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        disbursement_number: disbursementNumber,
        ...disbursement,
        currency: disbursement.currency || 'XOF',
        status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, disbursement: UpdateScholarshipDisbursement): Promise<ScholarshipDisbursement> {
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

  async complete(schoolId: string, id: string, transactionId: string): Promise<ScholarshipDisbursement> {
    return this.update(schoolId, id, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      transaction_id: transactionId,
    });
  }

  async fail(schoolId: string, id: string, notes?: string): Promise<ScholarshipDisbursement> {
    return this.update(schoolId, id, { status: 'failed', notes });
  }

  async reverse(schoolId: string, id: string, notes?: string): Promise<ScholarshipDisbursement> {
    return this.update(schoolId, id, { status: 'reversed', notes });
  }

  async getByProgram(schoolId: string, programId: string): Promise<ScholarshipDisbursement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('program_id', programId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByStudent(schoolId: string, studentId: string): Promise<ScholarshipDisbursement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByStatus(schoolId: string, status: string): Promise<ScholarshipDisbursement[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<ScholarshipDisbursement[]> {
    return this.getByStatus(schoolId, 'pending');
  }

  async getTotalDisbursed(schoolId: string, programId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('amount')
      .eq('school_id', schoolId)
      .eq('program_id', programId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).reduce((sum, d) => sum + d.amount, 0);
  }
}
