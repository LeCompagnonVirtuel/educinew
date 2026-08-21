import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface WellbeingTwin {
  id: string;
  school_id: string;
  student_id: string;
  twin_name: string;
  status: 'active' | 'inactive' | 'calibrating';
  last_sync_at: string;
  wellbeing_state: WellbeingState;
  predicted_state: WellbeingState;
  mood_history: MoodSnapshot[];
  intervention_history: InterventionSnapshot[];
  accuracy_score: number;
  alerts: WellbeingTwinAlert[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface WellbeingState {
  emotional: number;
  social: number;
  physical: number;
  academic: number;
  overall: number;
  timestamp: string;
}

export interface MoodSnapshot {
  date: string;
  mood: number;
  energy: number;
  stress: number;
}

export interface InterventionSnapshot {
  id: string;
  type: string;
  date: string;
  effectiveness: number;
}

export interface WellbeingTwinAlert {
  id: string;
  alert_type: string;
  severity: 'low' | 'moderate' | 'high';
  message: string;
  created_at: string;
}

export interface CreateWellbeingTwin {
  student_id: string;
  twin_name: string;
  wellbeing_state: WellbeingState;
  metadata?: Record<string, unknown>;
}

export interface UpdateWellbeingTwin {
  twin_name?: string;
  status?: string;
  last_sync_at?: string;
  wellbeing_state?: WellbeingState;
  predicted_state?: WellbeingState;
  mood_history?: MoodSnapshot[];
  intervention_history?: InterventionSnapshot[];
  accuracy_score?: number;
  alerts?: WellbeingTwinAlert[];
  metadata?: Record<string, unknown>;
}

export class WellbeingTwinService {
  private readonly TABLE = 'wellbeing_twins';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<WellbeingTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<WellbeingTwin | null> {
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

  async create(schoolId: string, twin: CreateWellbeingTwin): Promise<WellbeingTwin> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...twin,
        status: 'active',
        last_sync_at: new Date().toISOString(),
        predicted_state: twin.wellbeing_state,
        mood_history: [],
        intervention_history: [],
        accuracy_score: 100,
        alerts: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, twin: UpdateWellbeingTwin): Promise<WellbeingTwin> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...twin, updated_at: new Date().toISOString() })
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

  async sync(schoolId: string, id: string, state: WellbeingState): Promise<WellbeingTwin> {
    const twin = await this.getById(schoolId, id);
    if (!twin) throw new Error('Twin not found');

    const newMoodSnapshot: MoodSnapshot = {
      date: new Date().toISOString(),
      mood: state.emotional,
      energy: state.physical,
      stress: 100 - state.emotional,
    };

    return this.update(schoolId, id, {
      wellbeing_state: state,
      last_sync_at: new Date().toISOString(),
      mood_history: [...twin.mood_history, newMoodSnapshot].slice(-90),
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<WellbeingTwin | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async getWithAlerts(schoolId: string): Promise<WellbeingTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('alerts', 'eq', '[]')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getLowWellbeing(schoolId: string): Promise<WellbeingTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;

    return (data || []).filter((t) => t.wellbeing_state.overall < 50);
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    withAlerts: number;
    averageWellbeing: number;
    lowWellbeing: number;
  }> {
    const twins = await this.getAll(schoolId);
    const active = twins.filter((t) => t.status === 'active');

    return {
      total: twins.length,
      active: active.length,
      withAlerts: twins.filter((t) => t.alerts.length > 0).length,
      averageWellbeing: active.length > 0
        ? active.reduce((sum, t) => sum + t.wellbeing_state.overall, 0) / active.length
        : 0,
      lowWellbeing: active.filter((t) => t.wellbeing_state.overall < 50).length,
    };
  }
}
