import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface MandatoryReport {
  id: string;
  school_id: string;
  report_number: string;
  student_id: string;
  reporter_id: string;
  reporter_role: string;
  report_type: 'abuse' | 'neglect' | 'self_harm' | 'domestic_violence' | 'radicalization' | 'other';
  status: 'draft' | 'submitted' | 'acknowledged' | 'investigating' | 'closed';
  date_of_incident: string;
  date_reported: string;
  description: string;
  witnesses?: string[];
  actions_taken: string[];
  agency_reported_to?: string;
  agency_reference?: string;
  statutory_deadline: string;
  submitted_to_agency: boolean;
  submission_date?: string;
  submission_method?: string;
  acknowledgement_received: boolean;
  follow_up_actions: FollowUpAction[];
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface FollowUpAction {
  id: string;
  action: string;
  responsible: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
  completed_date?: string;
}

export interface CreateMandatoryReport {
  student_id: string;
  reporter_id: string;
  reporter_role: string;
  report_type: 'abuse' | 'neglect' | 'self_harm' | 'domestic_violence' | 'radicalization' | 'other';
  date_of_incident: string;
  description: string;
  witnesses?: string[];
  actions_taken?: string[];
  agency_reported_to?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateMandatoryReport {
  status?: string;
  description?: string;
  actions_taken?: string[];
  agency_reported_to?: string;
  agency_reference?: string;
  submitted_to_agency?: boolean;
  submission_date?: string;
  submission_method?: string;
  acknowledgement_received?: boolean;
  follow_up_actions?: FollowUpAction[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class MandatoryReportingService {
  private readonly TABLE = 'mandatory_reports';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<MandatoryReport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<MandatoryReport | null> {
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

  async create(schoolId: string, report: CreateMandatoryReport): Promise<MandatoryReport> {
    const reportNumber = `MR-${Date.now()}`;
    const statutoryDeadline = new Date();
    statutoryDeadline.setDate(statutoryDeadline.getDate() + 1);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        report_number: reportNumber,
        ...report,
        status: 'draft',
        date_reported: new Date().toISOString(),
        actions_taken: report.actions_taken || [],
        statutory_deadline: statutoryDeadline.toISOString(),
        submitted_to_agency: false,
        acknowledgement_received: false,
        follow_up_actions: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, report: UpdateMandatoryReport): Promise<MandatoryReport> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...report, updated_at: new Date().toISOString() })
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

  async submit(schoolId: string, id: string, method: string): Promise<MandatoryReport> {
    return this.update(schoolId, id, {
      status: 'submitted',
      submitted_to_agency: true,
      submission_date: new Date().toISOString(),
      submission_method: method,
    });
  }

  async addFollowUpAction(schoolId: string, id: string, action: FollowUpAction): Promise<MandatoryReport> {
    const report = await this.getById(schoolId, id);
    if (!report) throw new Error('Report not found');

    return this.update(schoolId, id, {
      follow_up_actions: [...report.follow_up_actions, action],
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<MandatoryReport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, reportType: string): Promise<MandatoryReport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('report_type', reportType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingSubmission(schoolId: string): Promise<MandatoryReport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('submitted_to_agency', false)
      .not('status', 'in', ['closed'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOverdue(schoolId: string): Promise<MandatoryReport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('submitted_to_agency', false)
      .lt('statutory_deadline', new Date().toISOString())
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    draft: number;
    submitted: number;
    pendingSubmission: number;
    overdue: number;
    closed: number;
  }> {
    const reports = await this.getAll(schoolId);
    return {
      total: reports.length,
      draft: reports.filter((r) => r.status === 'draft').length,
      submitted: reports.filter((r) => r.status === 'submitted').length,
      pendingSubmission: reports.filter((r) => !r.submitted_to_agency && r.status !== 'closed').length,
      overdue: reports.filter(
        (r) => !r.submitted_to_agency && r.statutory_deadline < new Date().toISOString()
      ).length,
      closed: reports.filter((r) => r.status === 'closed').length,
    };
  }
}
