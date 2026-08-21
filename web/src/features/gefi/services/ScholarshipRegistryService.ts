import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ScholarshipProgram {
  id: string;
  school_id: string;
  program_code: string;
  name: string;
  description: string;
  type: 'merit' | 'need_based' | 'athletic' | 'artistic' | 'research' | 'government' | 'international';
  donor_id?: string;
  total_fund: number;
  awarded_amount: number;
  currency: string;
  award_percentage?: number;
  max_recipients?: number;
  current_recipients: number;
  eligibility_criteria: Record<string, unknown>;
  selection_criteria: Record<string, unknown>;
  application_start_date: string;
  application_end_date: string;
  award_date: string;
  status: 'draft' | 'open' | 'closed' | 'awarded' | 'completed';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateScholarshipProgram {
  program_code: string;
  name: string;
  description: string;
  type: 'merit' | 'need_based' | 'athletic' | 'artistic' | 'research' | 'government' | 'international';
  donor_id?: string;
  total_fund: number;
  currency?: string;
  award_percentage?: number;
  max_recipients?: number;
  eligibility_criteria: Record<string, unknown>;
  selection_criteria: Record<string, unknown>;
  application_start_date: string;
  application_end_date: string;
  award_date: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateScholarshipProgram {
  name?: string;
  description?: string;
  total_fund?: number;
  max_recipients?: number;
  eligibility_criteria?: Record<string, unknown>;
  selection_criteria?: Record<string, unknown>;
  status?: 'draft' | 'open' | 'closed' | 'awarded' | 'completed';
  metadata?: Record<string, unknown>;
}

export class ScholarshipRegistryService {
  private readonly TABLE = 'scholarship_programs';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ScholarshipProgram[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ScholarshipProgram | null> {
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

  async create(schoolId: string, program: CreateScholarshipProgram): Promise<ScholarshipProgram> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...program,
        awarded_amount: 0,
        currency: program.currency || 'XOF',
        current_recipients: 0,
        status: 'draft',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, program: UpdateScholarshipProgram): Promise<ScholarshipProgram> {
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

  async openApplications(schoolId: string, id: string): Promise<ScholarshipProgram> {
    return this.update(schoolId, id, { status: 'open' });
  }

  async closeApplications(schoolId: string, id: string): Promise<ScholarshipProgram> {
    return this.update(schoolId, id, { status: 'closed' });
  }

  async getOpenPrograms(schoolId: string): Promise<ScholarshipProgram[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'open')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, type: string): Promise<ScholarshipProgram[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getAvailableFunds(schoolId: string, programId: string): Promise<number> {
    const program = await this.getById(schoolId, programId);
    if (!program) throw new Error('Program not found');
    return program.total_fund - program.awarded_amount;
  }

  async getRemainingSlots(schoolId: string, programId: string): Promise<number | null> {
    const program = await this.getById(schoolId, programId);
    if (!program) throw new Error('Program not found');
    if (!program.max_recipients) return null;
    return program.max_recipients - program.current_recipients;
  }
}
