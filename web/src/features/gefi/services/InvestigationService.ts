import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Investigation {
  id: string;
  school_id: string;
  investigation_number: string;
  alert_id?: string;
  title: string;
  description: string;
  type: 'internal' | 'external' | 'regulatory' | 'audit';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'evidence_collected' | 'analysis' | 'concluded' | 'closed';
  lead_investigator: string;
  team_members: string[];
  start_date: string;
  target_end_date?: string;
  actual_end_date?: string;
  findings?: string;
  evidence: InvestigationEvidence[];
  recommendations?: string[];
  outcome?: 'confirmed' | 'unfounded' | 'inconclusive';
  action_taken?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface InvestigationEvidence {
  id: string;
  type: 'document' | 'transaction' | 'witness' | 'system_log' | 'other';
  description: string;
  source: string;
  collected_at: string;
  collected_by: string;
  file_url?: string;
  hash?: string;
}

export interface CreateInvestigation {
  alert_id?: string;
  title: string;
  description: string;
  type: 'internal' | 'external' | 'regulatory' | 'audit';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lead_investigator: string;
  team_members: string[];
  start_date: string;
  target_end_date?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateInvestigation {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  team_members?: string[];
  target_end_date?: string;
  actual_end_date?: string;
  findings?: string;
  evidence?: InvestigationEvidence[];
  recommendations?: string[];
  outcome?: 'confirmed' | 'unfounded' | 'inconclusive';
  action_taken?: string;
  metadata?: Record<string, unknown>;
}

export class InvestigationService {
  private readonly TABLE = 'investigations';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Investigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Investigation | null> {
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

  async create(schoolId: string, investigation: CreateInvestigation): Promise<Investigation> {
    const investigationNumber = `INV-${Date.now()}`;

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

  async update(schoolId: string, id: string, investigation: UpdateInvestigation): Promise<Investigation> {
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

  async addEvidence(schoolId: string, id: string, evidence: InvestigationEvidence): Promise<Investigation> {
    const investigation = await this.getById(schoolId, id);
    if (!investigation) throw new Error('Investigation not found');

    return this.update(schoolId, id, {
      evidence: [...investigation.evidence, evidence],
      status: 'evidence_collected',
    });
  }

  async conclude(schoolId: string, id: string, findings: string, outcome: 'confirmed' | 'unfounded' | 'inconclusive', recommendations: string[]): Promise<Investigation> {
    return this.update(schoolId, id, {
      status: 'concluded',
      findings,
      outcome,
      recommendations,
      actual_end_date: new Date().toISOString(),
    });
  }

  async close(schoolId: string, id: string, actionTaken: string): Promise<Investigation> {
    return this.update(schoolId, id, {
      status: 'closed',
      action_taken: actionTaken,
    });
  }

  async getByStatus(schoolId: string, status: string): Promise<Investigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOpen(schoolId: string): Promise<Investigation[]> {
    return this.getByStatus(schoolId, 'open');
  }

  async getInProgress(schoolId: string): Promise<Investigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('status', ['in_progress', 'evidence_collected', 'analysis'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByAlert(schoolId: string, alertId: string): Promise<Investigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('alert_id', alertId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByLead(schoolId: string, leadInvestigator: string): Promise<Investigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('lead_investigator', leadInvestigator)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOverdue(schoolId: string): Promise<Investigation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('status', ['open', 'in_progress', 'evidence_collected', 'analysis'])
      .lt('target_end_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{ total: number; open: number; inProgress: number; concluded: number; confirmedRate: number }> {
    const investigations = await this.getAll(schoolId);
    const open = investigations.filter((i) => i.status === 'open').length;
    const inProgress = investigations.filter((i) => ['in_progress', 'evidence_collected', 'analysis'].includes(i.status)).length;
    const concluded = investigations.filter((i) => i.status === 'concluded' || i.status === 'closed');
    const confirmed = concluded.filter((i) => i.outcome === 'confirmed').length;
    const confirmedRate = concluded.length > 0 ? (confirmed / concluded.length) * 100 : 0;

    return { total: investigations.length, open, inProgress, concluded: concluded.length, confirmedRate };
  }
}
