import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ReconciliationJob {
  id: string;
  school_id: string;
  job_number: string;
  source_system: string;
  target_system: string;
  reconciliation_type: 'bank' | 'intercompany' | 'suspense' | 'petty_cash' | 'custom';
  period_start: string;
  period_end: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  total_records: number;
  matched_records: number;
  unmatched_records: number;
  match_rate: number;
  started_at?: string;
  completed_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ReconciliationMatch {
  id: string;
  job_id: string;
  source_record_id: string;
  target_record_id?: string;
  match_score: number;
  match_type: 'exact' | 'fuzzy' | 'manual' | 'rule_based';
  status: 'matched' | 'unmatched' | 'disputed' | 'resolved';
  source_amount: number;
  target_amount?: number;
  difference: number;
  notes?: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReconciliationJob {
  source_system: string;
  target_system: string;
  reconciliation_type: 'bank' | 'intercompany' | 'suspense' | 'petty_cash' | 'custom';
  period_start: string;
  period_end: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateReconciliationJob {
  status?: string;
  total_records?: number;
  matched_records?: number;
  unmatched_records?: number;
  match_rate?: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export class ReconciliationEngineService {
  private readonly JOBS_TABLE = 'reconciliation_jobs';
  private readonly MATCHES_TABLE = 'reconciliation_matches';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllJobs(schoolId: string): Promise<ReconciliationJob[]> {
    const { data, error } = await this.supabase
      .from(this.JOBS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getJobById(schoolId: string, id: string): Promise<ReconciliationJob | null> {
    const { data, error } = await this.supabase
      .from(this.JOBS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createJob(schoolId: string, job: CreateReconciliationJob): Promise<ReconciliationJob> {
    const jobNumber = `REC-JOB-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.JOBS_TABLE)
      .insert({
        job_number: jobNumber,
        ...job,
        status: 'pending',
        total_records: 0,
        matched_records: 0,
        unmatched_records: 0,
        match_rate: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateJob(schoolId: string, id: string, job: UpdateReconciliationJob): Promise<ReconciliationJob> {
    const { data, error } = await this.supabase
      .from(this.JOBS_TABLE)
      .update({ ...job, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.JOBS_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async startJob(schoolId: string, id: string): Promise<ReconciliationJob> {
    return this.updateJob(schoolId, id, {
      status: 'running',
      started_at: new Date().toISOString(),
    });
  }

  async completeJob(schoolId: string, id: string, totalRecords: number, matchedRecords: number): Promise<ReconciliationJob> {
    const unmatchedRecords = totalRecords - matchedRecords;
    const matchRate = totalRecords > 0 ? (matchedRecords / totalRecords) * 100 : 0;

    return this.updateJob(schoolId, id, {
      status: 'completed',
      total_records: totalRecords,
      matched_records: matchedRecords,
      unmatched_records: unmatchedRecords,
      match_rate: matchRate,
      completed_at: new Date().toISOString(),
    });
  }

  async failJob(schoolId: string, id: string, errorMessage: string): Promise<ReconciliationJob> {
    return this.updateJob(schoolId, id, {
      status: 'failed',
      error_message: errorMessage,
    });
  }

  async getMatches(schoolId: string, jobId: string): Promise<ReconciliationMatch[]> {
    const { data, error } = await this.supabase
      .from(this.MATCHES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('job_id', jobId)
      .order('match_score', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createMatch(schoolId: string, match: Omit<ReconciliationMatch, 'id' | 'created_at' | 'updated_at' | 'school_id'>): Promise<ReconciliationMatch> {
    const { data, error } = await this.supabase
      .from(this.MATCHES_TABLE)
      .insert({ ...match, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateMatch(schoolId: string, id: string, updates: Partial<ReconciliationMatch>): Promise<ReconciliationMatch> {
    const { data, error } = await this.supabase
      .from(this.MATCHES_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUnmatched(schoolId: string, jobId: string): Promise<ReconciliationMatch[]> {
    const { data, error } = await this.supabase
      .from(this.MATCHES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('job_id', jobId)
      .eq('status', 'unmatched');

    if (error) throw error;
    return data || [];
  }

  async getByStatus(schoolId: string, status: string): Promise<ReconciliationJob[]> {
    const { data, error } = await this.supabase
      .from(this.JOBS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getRunningJobs(schoolId: string): Promise<ReconciliationJob[]> {
    return this.getByStatus(schoolId, 'running');
  }

  async getJobStats(schoolId: string): Promise<{ totalJobs: number; completed: number; failed: number; averageMatchRate: number }> {
    const jobs = await this.getAllJobs(schoolId);
    const completed = jobs.filter((j) => j.status === 'completed');
    const failed = jobs.filter((j) => j.status === 'failed');
    const averageMatchRate = completed.length > 0 ? completed.reduce((sum, j) => sum + j.match_rate, 0) / completed.length : 0;

    return { totalJobs: jobs.length, completed: completed.length, failed: failed.length, averageMatchRate };
  }
}
