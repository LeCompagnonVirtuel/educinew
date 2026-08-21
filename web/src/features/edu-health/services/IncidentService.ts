import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HealthIncident {
  id: string;
  school_id: string;
  incident_number: string;
  incident_type: 'injury' | 'illness' | 'allergic_reaction' | 'medication_error' | 'mental_health_crisis' | 'other';
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  student_id: string;
  reported_by: string;
  date_of_incident: string;
  time_of_incident: string;
  location: string;
  description: string;
  witnesses: string[];
  immediate_actions: string[];
  first_aid_given: boolean;
  first_aid_details?: string;
  medical_attention_required: boolean;
  medical_attention_details?: string;
  parent_notified: boolean;
  parent_notification_time?: string;
  staff_involved: string[];
  root_cause?: string;
  preventive_measures: string[];
  follow_up_required: boolean;
  follow_up_date?: string;
  follow_up_notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateHealthIncident {
  incident_type: 'injury' | 'illness' | 'allergic_reaction' | 'medication_error' | 'mental_health_crisis' | 'other';
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  student_id: string;
  reported_by: string;
  date_of_incident: string;
  time_of_incident: string;
  location: string;
  description: string;
  witnesses?: string[];
  immediate_actions?: string[];
  first_aid_given?: boolean;
  first_aid_details?: string;
  medical_attention_required?: boolean;
  medical_attention_details?: string;
  staff_involved?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateHealthIncident {
  status?: string;
  severity?: string;
  root_cause?: string;
  preventive_measures?: string[];
  parent_notified?: boolean;
  parent_notification_time?: string;
  follow_up_required?: boolean;
  follow_up_date?: string;
  follow_up_notes?: string;
  metadata?: Record<string, unknown>;
}

export class IncidentService {
  private readonly TABLE = 'health_incidents';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<HealthIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<HealthIncident | null> {
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

  async create(schoolId: string, incident: CreateHealthIncident): Promise<HealthIncident> {
    const incidentNumber = `INC-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        incident_number: incidentNumber,
        ...incident,
        status: 'reported',
        witnesses: incident.witnesses || [],
        immediate_actions: incident.immediate_actions || [],
        first_aid_given: incident.first_aid_given ?? false,
        medical_attention_required: incident.medical_attention_required ?? false,
        parent_notified: false,
        staff_involved: incident.staff_involved || [],
        preventive_measures: [],
        follow_up_required: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, incident: UpdateHealthIncident): Promise<HealthIncident> {
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

  async getByStudent(schoolId: string, studentId: string): Promise<HealthIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, incidentType: string): Promise<HealthIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('incident_type', incidentType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getSevere(schoolId: string): Promise<HealthIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('severity', ['severe', 'critical'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingFollowUp(schoolId: string): Promise<HealthIncident[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('follow_up_required', true)
      .not('follow_up_date', 'is', null)
      .lte('follow_up_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    open: number;
    severe: number;
    withMedicalAttention: number;
    byType: Record<string, number>;
  }> {
    const incidents = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    incidents.forEach((i) => {
      byType[i.incident_type] = (byType[i.incident_type] || 0) + 1;
    });

    return {
      total: incidents.length,
      open: incidents.filter((i) => !['resolved', 'closed'].includes(i.status)).length,
      severe: incidents.filter((i) => i.severity === 'severe' || i.severity === 'critical').length,
      withMedicalAttention: incidents.filter((i) => i.medical_attention_required).length,
      byType,
    };
  }
}
