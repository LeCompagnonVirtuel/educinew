import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SafeguardingConcern {
  id: string;
  school_id: string;
  concern_number: string;
  student_id: string;
  reported_by: string;
  reporter_role: string;
  concern_type: 'neglect' | 'physical_abuse' | 'emotional_abuse' | 'sexual_abuse' | 'bullying' | 'self_harm' | 'radicalization' | 'other';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  status: 'reported' | 'under_investigation' | 'referred' | 'resolved' | 'closed';
  description: string;
  date_observed: string;
  date_reported: string;
  witnesses?: string[];
  evidence: SafeguardingEvidence[];
  assigned_to?: string;
  referral_agency?: string;
  referral_date?: string;
  referral_reference?: string;
  outcome?: string;
  follow_up_date?: string;
  follow_up_notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SafeguardingEvidence {
  id: string;
  type: 'statement' | 'document' | 'photo' | 'medical_report' | 'other';
  description: string;
  source: string;
  date_collected: string;
  collected_by: string;
  file_url?: string;
}

export interface CreateSafeguardingConcern {
  student_id: string;
  reported_by: string;
  reporter_role: string;
  concern_type: 'neglect' | 'physical_abuse' | 'emotional_abuse' | 'sexual_abuse' | 'bullying' | 'self_harm' | 'radicalization' | 'other';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  description: string;
  date_observed: string;
  witnesses?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateSafeguardingConcern {
  status?: string;
  assigned_to?: string;
  referral_agency?: string;
  referral_date?: string;
  referral_reference?: string;
  outcome?: string;
  follow_up_date?: string;
  follow_up_notes?: string;
  evidence?: SafeguardingEvidence[];
  metadata?: Record<string, unknown>;
}

export class SafeguardingService {
  private readonly TABLE = 'safeguarding_concerns';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SafeguardingConcern[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SafeguardingConcern | null> {
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

  async create(schoolId: string, concern: CreateSafeguardingConcern): Promise<SafeguardingConcern> {
    const concernNumber = `SC-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        concern_number: concernNumber,
        ...concern,
        status: 'reported',
        date_reported: new Date().toISOString(),
        evidence: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, concern: UpdateSafeguardingConcern): Promise<SafeguardingConcern> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...concern, updated_at: new Date().toISOString() })
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

  async addEvidence(schoolId: string, id: string, evidence: SafeguardingEvidence): Promise<SafeguardingConcern> {
    const concern = await this.getById(schoolId, id);
    if (!concern) throw new Error('Safeguarding concern not found');

    return this.update(schoolId, id, {
      evidence: [...concern.evidence, evidence],
    });
  }

  async escalate(schoolId: string, id: string, assignedTo: string): Promise<SafeguardingConcern> {
    return this.update(schoolId, id, {
      status: 'under_investigation',
      assigned_to: assignedTo,
    });
  }

  async refer(schoolId: string, id: string, agency: string, reference: string): Promise<SafeguardingConcern> {
    return this.update(schoolId, id, {
      status: 'referred',
      referral_agency: agency,
      referral_date: new Date().toISOString(),
      referral_reference: reference,
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<SafeguardingConcern[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, concernType: string): Promise<SafeguardingConcern[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('concern_type', concernType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getCritical(schoolId: string): Promise<SafeguardingConcern[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('severity', 'critical')
      .not('status', 'in', ['resolved', 'closed'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOpen(schoolId: string): Promise<SafeguardingConcern[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('status', 'in', ['resolved', 'closed'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    open: number;
    critical: number;
    referred: number;
    resolved: number;
  }> {
    const concerns = await this.getAll(schoolId);
    return {
      total: concerns.length,
      open: concerns.filter((c) => !['resolved', 'closed'].includes(c.status)).length,
      critical: concerns.filter((c) => c.severity === 'critical').length,
      referred: concerns.filter((c) => c.status === 'referred').length,
      resolved: concerns.filter((c) => c.status === 'resolved' || c.status === 'closed').length,
    };
  }
}
