import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HealthInvestigation {
  id: string;
  school_id: string;
  investigation_number: string;
  incident_id?: string;
  safeguarding_concern_id?: string;
  title: string;
  description: string;
  type: 'safeguarding' | 'bullying' | 'harassment' | 'misconduct' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'evidence_gathering' | 'analysis' | 'concluded' | 'closed';
  lead_investigator: string;
  team_members: string[];
  start_date: string;
  target_end_date?: string;
  actual_end_date?: string;
  evidence: InvestigationEvidenceItem[];
  findings?: string;
  recommendations?: string[];
  outcome?: 'confirmed' | 'unfounded' | 'inconclusive';
  action_taken?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface InvestigationEvidenceItem {
  id: string;
  type: 'statement' | 'document' | 'physical' | 'digital' | 'witness';
  description: string;
  source: string;
  date_collected: string;
  collected_by: string;
  file_url?: string;
}

export interface CreateHealthInvestigation {
  incident_id?: string;
  safeguarding_concern_id?: string;
  title: string;
  description: string;
  type: 'safeguarding' | 'bullying' | 'harassment' | 'misconduct' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lead_investigator: string;
  team_members: string[];
  start_date: string;
  target_end_date?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateHealthInvestigation {
  status?: string;
  priority?: string;
  team_members?: string[];
  target_end_date?: string;
  actual_end_date?: string;
  evidence?: InvestigationEvidenceItem[];
  findings?: string;
  recommendations?: string[];
  outcome?: string;
  action_taken?: string;
  metadata?: Record<string, unknown>;
}

export class HealthInvestigationService {
  private readonly TABLE = 'health_investigations';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<HealthInvestigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<HealthInvestigation | null> {
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

  async create(schoolId: string, investigation: CreateHealthInvestigation): Promise<HealthInvestigation> {
    const investigationNumber = `HI-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        investigation_number: investigationNumber,
        ...investigation,
        status: 'open',
        evidence: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, investigation: UpdateHealthInvestigation): Promise<HealthInvestigation> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...investigation, updated_at: new Date().toISOString() })
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

  async addEvidence(schoolId: string, id: string, evidence: InvestigationEvidenceItem): Promise<HealthInvestigation> {
    const investigation = await this.getById(schoolId, id);
    if (!investigation) throw new Error('Investigation not found');

    return this.update(schoolId, id, {
      evidence: [...investigation.evidence, evidence],
      status: 'evidence_gathering',
    });
  }

  async conclude(schoolId: string, id: string, findings: string, outcome: string, recommendations: string[]): Promise<HealthInvestigation> {
    return this.update(schoolId, id, {
      status: 'concluded',
      findings,
      outcome: outcome as 'confirmed' | 'unfounded' | 'inconclusive',
      recommendations,
      actual_end_date: new Date().toISOString(),
    });
  }

  async getByType(schoolId: string, type: string): Promise<HealthInvestigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOpen(schoolId: string): Promise<HealthInvestigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('status', 'in', ['concluded', 'closed'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOverdue(schoolId: string): Promise<HealthInvestigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('status', 'in', ['concluded', 'closed'])
      .not('target_end_date', 'is', null)
      .lt('target_end_date', new Date().toISOString())
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    open: number;
    concluded: number;
    confirmed: number;
    averageDaysToComplete: number;
  }> {
    const investigations = await this.getAll(schoolId);
    const concluded = investigations.filter((i) => i.status === 'concluded');
    const completionDays = concluded
      .filter((i) => i.actual_end_date)
      .map((i) => {
        const start = new Date(i.start_date);
        const end = new Date(i.actual_end_date!);
        return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      });

    return {
      total: investigations.length,
      open: investigations.filter((i) => !['concluded', 'closed'].includes(i.status)).length,
      concluded: concluded.length,
      confirmed: concluded.filter((i) => i.outcome === 'confirmed').length,
      averageDaysToComplete: completionDays.length > 0
        ? completionDays.reduce((a, b) => a + b, 0) / completionDays.length
        : 0,
    };
  }
}
