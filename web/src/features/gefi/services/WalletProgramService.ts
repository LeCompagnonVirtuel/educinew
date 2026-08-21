import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface WalletProgram {
  id: string;
  school_id: string;
  program_code: string;
  name: string;
  description: string;
  type: 'scholarship' | 'grant' | 'loan' | 'cashback' | 'reward' | 'custom';
  funding_source: string;
  total_budget: number;
  allocated_amount: number;
  disbursed_amount: number;
  currency: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  eligibility_criteria: Record<string, unknown>;
  disbursement_rules: Record<string, unknown>;
  start_date: string;
  end_date?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ProgramEnrollment {
  id: string;
  program_id: string;
  wallet_id: string;
  student_id: string;
  status: 'pending' | 'approved' | 'active' | 'completed' | 'rejected' | 'suspended';
  enrolled_at: string;
  approved_at?: string;
  approved_by?: string;
  metadata?: Record<string, unknown>;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateWalletProgram {
  program_code: string;
  name: string;
  description: string;
  type: 'scholarship' | 'grant' | 'loan' | 'cashback' | 'reward' | 'custom';
  funding_source: string;
  total_budget: number;
  currency?: string;
  eligibility_criteria: Record<string, unknown>;
  disbursement_rules: Record<string, unknown>;
  start_date: string;
  end_date?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateWalletProgram {
  name?: string;
  description?: string;
  total_budget?: number;
  status?: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  eligibility_criteria?: Record<string, unknown>;
  disbursement_rules?: Record<string, unknown>;
  end_date?: string;
  metadata?: Record<string, unknown>;
}

export class WalletProgramService {
  private readonly TABLE = 'wallet_programs';
  private readonly ENROLLMENTS_TABLE = 'program_enrollments';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<WalletProgram[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<WalletProgram | null> {
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

  async create(schoolId: string, program: CreateWalletProgram): Promise<WalletProgram> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...program,
        allocated_amount: 0,
        disbursed_amount: 0,
        currency: program.currency || 'XOF',
        status: 'draft',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, program: UpdateWalletProgram): Promise<WalletProgram> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...program, updated_at: new Date().toISOString() })
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

  async activate(schoolId: string, id: string): Promise<WalletProgram> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async pause(schoolId: string, id: string): Promise<WalletProgram> {
    return this.update(schoolId, id, { status: 'paused' });
  }

  async enroll(schoolId: string, programId: string, walletId: string, studentId: string): Promise<ProgramEnrollment> {
    const { data, error } = await this.supabase
      .from(this.ENROLLMENTS_TABLE)
      .insert({
        program_id: programId,
        wallet_id: walletId,
        student_id: studentId,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async approveEnrollment(schoolId: string, enrollmentId: string, approvedBy: string): Promise<ProgramEnrollment> {
    const { data, error } = await this.supabase
      .from(this.ENROLLMENTS_TABLE)
      .update({
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: approvedBy,
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', enrollmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getEnrollments(schoolId: string, programId: string): Promise<ProgramEnrollment[]> {
    const { data, error } = await this.supabase
      .from(this.ENROLLMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('program_id', programId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getActivePrograms(schoolId: string): Promise<WalletProgram[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getBudgetSummary(schoolId: string, programId: string): Promise<{ total: number; allocated: number; disbursed: number; remaining: number }> {
    const program = await this.getById(schoolId, programId);
    if (!program) throw new Error('Program not found');
    return {
      total: program.total_budget,
      allocated: program.allocated_amount,
      disbursed: program.disbursed_amount,
      remaining: program.total_budget - program.allocated_amount,
    };
  }
}
