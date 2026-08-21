import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface GrantReport {
  id: string;
  school_id: string;
  report_number: string;
  grant_id: string;
  report_type: 'financial' | 'narrative' | 'progress' | 'final' | 'audit';
  period_start: string;
  period_end: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
  submitted_by: string;
  submitted_at?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  report_data: Record<string, unknown>;
  financial_summary?: Record<string, unknown>;
  narrative?: string;
  achievements?: string[];
  challenges?: string[];
  next_steps?: string[];
  attachments?: string[];
  feedback?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface GrantMilestone {
  id: string;
  grant_id: string;
  report_id?: string;
  title: string;
  description: string;
  target_date: string;
  completed_date?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  evidence?: string[];
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGrantReport {
  grant_id: string;
  report_type: 'financial' | 'narrative' | 'progress' | 'final' | 'audit';
  period_start: string;
  period_end: string;
  submitted_by: string;
  report_data: Record<string, unknown>;
  financial_summary?: Record<string, unknown>;
  narrative?: string;
  achievements?: string[];
  challenges?: string[];
  next_steps?: string[];
  attachments?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateGrantReport {
  status?: string;
  report_data?: Record<string, unknown>;
  financial_summary?: Record<string, unknown>;
  narrative?: string;
  achievements?: string[];
  challenges?: string[];
  next_steps?: string[];
  attachments?: string[];
  feedback?: string;
  metadata?: Record<string, unknown>;
}

export class GrantReportingService {
  private readonly REPORTS_TABLE = 'grant_reports';
  private readonly MILESTONES_TABLE = 'grant_milestones';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllReports(schoolId: string): Promise<GrantReport[]> {
    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getReportById(schoolId: string, id: string): Promise<GrantReport | null> {
    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createReport(schoolId: string, report: CreateGrantReport): Promise<GrantReport> {
    const reportNumber = `GR-RPT-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .insert({
        report_number: reportNumber,
        ...report,
        status: 'draft',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateReport(schoolId: string, id: string, report: UpdateGrantReport): Promise<GrantReport> {
    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .update({ ...report, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async submitReport(schoolId: string, id: string): Promise<GrantReport> {
    return this.updateReport(schoolId, id, {
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    });
  }

  async approveReport(schoolId: string, id: string, reviewedBy: string): Promise<GrantReport> {
    return this.updateReport(schoolId, id, {
      status: 'approved',
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
    });
  }

  async rejectReport(schoolId: string, id: string, reviewedBy: string, feedback: string): Promise<GrantReport> {
    return this.updateReport(schoolId, id, {
      status: 'rejected',
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
      feedback,
    });
  }

  async getByGrant(schoolId: string, grantId: string): Promise<GrantReport[]> {
    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('grant_id', grantId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, reportType: string): Promise<GrantReport[]> {
    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('report_type', reportType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async createMilestone(schoolId: string, milestone: Omit<GrantMilestone, 'id' | 'created_at' | 'updated_at' | 'school_id'>): Promise<GrantMilestone> {
    const { data, error } = await this.supabase
      .from(this.MILESTONES_TABLE)
      .insert({ ...milestone, status: 'pending', school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateMilestone(schoolId: string, id: string, updates: Partial<GrantMilestone>): Promise<GrantMilestone> {
    const { data, error } = await this.supabase
      .from(this.MILESTONES_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async completeMilestone(schoolId: string, id: string, evidence: string[]): Promise<GrantMilestone> {
    return this.updateMilestone(schoolId, id, {
      status: 'completed',
      completed_date: new Date().toISOString(),
      evidence,
    });
  }

  async getMilestones(schoolId: string, grantId: string): Promise<GrantMilestone[]> {
    const { data, error } = await this.supabase
      .from(this.MILESTONES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('grant_id', grantId)
      .order('target_date');

    if (error) throw error;
    return data || [];
  }
}
