import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface EmergencyResponse {
  id: string;
  school_id: string;
  response_number: string;
  emergency_type: 'medical' | 'mental_health' | 'safeguarding' | 'safety' | 'natural_disaster' | 'other';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  status: 'active' | 'responding' | 'contained' | 'resolved' | 'debriefed';
  reported_by: string;
  date_time: string;
  location: string;
  description: string;
  students_affected: string[];
  immediate_actions: EmergencyAction[];
  first_responders: string[];
  external_services_notified: string[];
  parents_notified: boolean;
  parents_notification_time?: string;
  all_clear_time?: string;
  debrief_completed: boolean;
  debrief_date?: string;
  lessons_learned?: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface EmergencyAction {
  id: string;
  action: string;
  taken_by: string;
  time: string;
  outcome: string;
}

export interface CreateEmergencyResponse {
  emergency_type: 'medical' | 'mental_health' | 'safeguarding' | 'safety' | 'natural_disaster' | 'other';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  reported_by: string;
  location: string;
  description: string;
  students_affected?: string[];
  immediate_actions?: EmergencyAction[];
  first_responders?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateEmergencyResponse {
  status?: string;
  immediate_actions?: EmergencyAction[];
  first_responders?: string[];
  external_services_notified?: string[];
  parents_notified?: boolean;
  parents_notification_time?: string;
  all_clear_time?: string;
  debrief_completed?: boolean;
  debrief_date?: string;
  lessons_learned?: string[];
  metadata?: Record<string, unknown>;
}

export class EmergencyService {
  private readonly TABLE = 'emergency_responses';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<EmergencyResponse[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<EmergencyResponse | null> {
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

  async create(schoolId: string, response: CreateEmergencyResponse): Promise<EmergencyResponse> {
    const responseNumber = `ER-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        response_number: responseNumber,
        ...response,
        status: 'active',
        date_time: new Date().toISOString(),
        students_affected: response.students_affected || [],
        immediate_actions: response.immediate_actions || [],
        first_responders: response.first_responders || [],
        external_services_notified: [],
        parents_notified: false,
        debrief_completed: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, response: UpdateEmergencyResponse): Promise<EmergencyResponse> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...response, updated_at: new Date().toISOString() })
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

  async addAction(schoolId: string, id: string, action: EmergencyAction): Promise<EmergencyResponse> {
    const response = await this.getById(schoolId, id);
    if (!response) throw new Error('Emergency response not found');

    return this.update(schoolId, id, {
      immediate_actions: [...response.immediate_actions, action],
    });
  }

  async contain(schoolId: string, id: string): Promise<EmergencyResponse> {
    return this.update(schoolId, id, {
      status: 'contained',
      all_clear_time: new Date().toISOString(),
    });
  }

  async resolve(schoolId: string, id: string): Promise<EmergencyResponse> {
    return this.update(schoolId, id, {
      status: 'resolved',
    });
  }

  async completeDebrief(schoolId: string, id: string, lessonsLearned: string[]): Promise<EmergencyResponse> {
    return this.update(schoolId, id, {
      status: 'debriefed',
      debrief_completed: true,
      debrief_date: new Date().toISOString(),
      lessons_learned: lessonsLearned,
    });
  }

  async getActive(schoolId: string): Promise<EmergencyResponse[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('status', 'in', ['resolved', 'debriefed'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, emergencyType: string): Promise<EmergencyResponse[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('emergency_type', emergencyType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    resolved: number;
    byType: Record<string, number>;
    averageResponseTime: number;
  }> {
    const responses = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    responses.forEach((r) => {
      byType[r.emergency_type] = (byType[r.emergency_type] || 0) + 1;
    });

    return {
      total: responses.length,
      active: responses.filter((r) => !['resolved', 'debriefed'].includes(r.status)).length,
      resolved: responses.filter((r) => r.status === 'resolved' || r.status === 'debriefed').length,
      byType,
      averageResponseTime: 0,
    };
  }
}
