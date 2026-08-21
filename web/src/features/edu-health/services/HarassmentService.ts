import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HarassmentCase {
  id: string;
  school_id: string;
  case_number: string;
  reporter_id: string;
  respondent_id: string;
  harassment_type: 'racial' | 'gender' | 'sexual' | 'disability' | 'religious' | 'other';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  status: 'reported' | 'under_investigation' | 'hearing' | 'resolved' | 'appealed' | 'closed';
  date_of_incident: string;
  date_reported: string;
  description: string;
  witnesses: string[];
  evidence: HarassmentEvidence[];
  investigator_id?: string;
  hearing_date?: string;
  finding?: 'substantiated' | 'unsubstantiated' | 'inconclusive';
  sanction?: string;
  appeal_deadline?: string;
  support_provided: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface HarassmentEvidence {
  id: string;
  type: 'document' | 'testimony' | 'digital' | 'physical' | 'other';
  description: string;
  source: string;
  date_collected: string;
  file_url?: string;
}

export interface CreateHarassmentCase {
  reporter_id: string;
  respondent_id: string;
  harassment_type: 'racial' | 'gender' | 'sexual' | 'disability' | 'religious' | 'other';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  date_of_incident: string;
  description: string;
  witnesses?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateHarassmentCase {
  status?: string;
  investigator_id?: string;
  hearing_date?: string;
  finding?: string;
  sanction?: string;
  appeal_deadline?: string;
  support_provided?: string[];
  evidence?: HarassmentEvidence[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class HarassmentService {
  private readonly TABLE = 'harassment_cases';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<HarassmentCase[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<HarassmentCase | null> {
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

  async create(schoolId: string, caseData: CreateHarassmentCase): Promise<HarassmentCase> {
    const caseNumber = `HAR-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        case_number: caseNumber,
        ...caseData,
        status: 'reported',
        date_reported: new Date().toISOString(),
        witnesses: caseData.witnesses || [],
        evidence: [],
        support_provided: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, caseData: UpdateHarassmentCase): Promise<HarassmentCase> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...caseData, updated_at: new Date().toISOString() })
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

  async addEvidence(schoolId: string, id: string, evidence: HarassmentEvidence): Promise<HarassmentCase> {
    const caseRecord = await this.getById(schoolId, id);
    if (!caseRecord) throw new Error('Case not found');

    return this.update(schoolId, id, {
      evidence: [...caseRecord.evidence, evidence],
    });
  }

  async assignInvestigator(schoolId: string, id: string, investigatorId: string): Promise<HarassmentCase> {
    return this.update(schoolId, id, {
      status: 'under_investigation',
      investigator_id: investigatorId,
    });
  }

  async scheduleHearing(schoolId: string, id: string, hearingDate: string): Promise<HarassmentCase> {
    return this.update(schoolId, id, {
      status: 'hearing',
      hearing_date: hearingDate,
    });
  }

  async getByReporter(schoolId: string, reporterId: string): Promise<HarassmentCase[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('reporter_id', reporterId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByRespondent(schoolId: string, respondentId: string): Promise<HarassmentCase[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('respondent_id', respondentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOpen(schoolId: string): Promise<HarassmentCase[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('status', 'in', ['closed'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    open: number;
    substantiated: number;
    byType: Record<string, number>;
  }> {
    const cases = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    cases.forEach((c) => {
      byType[c.harassment_type] = (byType[c.harassment_type] || 0) + 1;
    });

    return {
      total: cases.length,
      open: cases.filter((c) => !['closed'].includes(c.status)).length,
      substantiated: cases.filter((c) => c.finding === 'substantiated').length,
      byType,
    };
  }
}
