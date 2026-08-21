import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface BullyingIncident {
  id: string;
  school_id: string;
  incident_number: string;
  student_id: string;
  bully_id?: string;
  bullying_type: 'physical' | 'verbal' | 'social' | 'cyber' | 'other';
  severity: 'low' | 'moderate' | 'high' | 'severe';
  status: 'reported' | 'investigating' | 'intervention' | 'resolved' | 'closed';
  date_of_incident: string;
  date_reported: string;
  location: string;
  description: string;
  witnesses: string[];
  evidence: string[];
  impact_assessment: string;
  interventions_applied: BullyingIntervention[];
  parent_notified: boolean;
  follow_up_date?: string;
  recurring: boolean;
  previous_incidents: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface BullyingIntervention {
  id: string;
  type: 'mediation' | 'counseling' | 'disciplinary' | 'education' | 'restorative';
  description: string;
  date: string;
  outcome?: string;
}

export interface CreateBullyingIncident {
  student_id: string;
  bully_id?: string;
  bullying_type: 'physical' | 'verbal' | 'social' | 'cyber' | 'other';
  severity: 'low' | 'moderate' | 'high' | 'severe';
  date_of_incident: string;
  location: string;
  description: string;
  witnesses?: string[];
  recurring?: boolean;
  previous_incidents?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateBullyingIncident {
  status?: string;
  bully_id?: string;
  impact_assessment?: string;
  interventions_applied?: BullyingIntervention[];
  parent_notified?: boolean;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class BullyingService {
  private readonly TABLE = 'bullying_incidents';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<BullyingIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<BullyingIncident | null> {
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

  async create(schoolId: string, incident: CreateBullyingIncident): Promise<BullyingIncident> {
    const incidentNumber = `BUL-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        incident_number: incidentNumber,
        ...incident,
        status: 'reported',
        date_reported: new Date().toISOString(),
        witnesses: incident.witnesses || [],
        evidence: [],
        interventions_applied: [],
        parent_notified: false,
        recurring: incident.recurring ?? false,
        previous_incidents: incident.previous_incidents || [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, incident: UpdateBullyingIncident): Promise<BullyingIncident> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...incident, updated_at: new Date().toISOString() })
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

  async addIntervention(schoolId: string, id: string, intervention: BullyingIntervention): Promise<BullyingIncident> {
    const incident = await this.getById(schoolId, id);
    if (!incident) throw new Error('Incident not found');

    return this.update(schoolId, id, {
      interventions_applied: [...incident.interventions_applied, intervention],
      status: 'intervention',
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<BullyingIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getRecurring(schoolId: string): Promise<BullyingIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('recurring', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, bullyingType: string): Promise<BullyingIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('bullying_type', bullyingType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getSevere(schoolId: string): Promise<BullyingIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('severity', ['high', 'severe'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    open: number;
    recurring: number;
    severe: number;
    byType: Record<string, number>;
  }> {
    const incidents = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    incidents.forEach((i) => {
      byType[i.bullying_type] = (byType[i.bullying_type] || 0) + 1;
    });

    return {
      total: incidents.length,
      open: incidents.filter((i) => !['resolved', 'closed'].includes(i.status)).length,
      recurring: incidents.filter((i) => i.recurring).length,
      severe: incidents.filter((i) => i.severity === 'severe').length,
      byType,
    };
  }
}
