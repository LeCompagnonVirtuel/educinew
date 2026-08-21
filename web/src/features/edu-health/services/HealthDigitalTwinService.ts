import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HealthDigitalTwin {
  id: string;
  school_id: string;
  twin_name: string;
  twin_type: 'student' | 'campus' | 'system';
  entity_id: string;
  status: 'active' | 'inactive' | 'syncing';
  last_sync_at: string;
  sync_frequency: string;
  digital_state: Record<string, unknown>;
  physical_state: Record<string, unknown>;
  sync_accuracy: number;
  anomalies_detected: number;
  predictions: DigitalTwinPrediction[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface DigitalTwinPrediction {
  id: string;
  prediction_type: string;
  value: number;
  confidence: number;
  timeframe: string;
  generated_at: string;
}

export interface CreateHealthDigitalTwin {
  twin_name: string;
  twin_type: 'student' | 'campus' | 'system';
  entity_id: string;
  sync_frequency: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateHealthDigitalTwin {
  twin_name?: string;
  status?: string;
  last_sync_at?: string;
  sync_frequency?: string;
  digital_state?: Record<string, unknown>;
  physical_state?: Record<string, unknown>;
  sync_accuracy?: number;
  anomalies_detected?: number;
  predictions?: DigitalTwinPrediction[];
  metadata?: Record<string, unknown>;
}

export class HealthDigitalTwinService {
  private readonly TABLE = 'health_digital_twins';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<HealthDigitalTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<HealthDigitalTwin | null> {
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

  async create(schoolId: string, twin: CreateHealthDigitalTwin): Promise<HealthDigitalTwin> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...twin,
        status: 'active',
        last_sync_at: new Date().toISOString(),
        digital_state: {},
        physical_state: {},
        sync_accuracy: 100,
        anomalies_detected: 0,
        predictions: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, twin: UpdateHealthDigitalTwin): Promise<HealthDigitalTwin> {
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

  async sync(schoolId: string, id: string, physicalState: Record<string, unknown>): Promise<HealthDigitalTwin> {
    return this.update(schoolId, id, {
      physical_state: physicalState,
      last_sync_at: new Date().toISOString(),
    });
  }

  async getByType(schoolId: string, twinType: string): Promise<HealthDigitalTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('twin_type', twinType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<HealthDigitalTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getWithAnomalies(schoolId: string): Promise<HealthDigitalTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .gt('anomalies_detected', 0)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    withAnomalies: number;
    averageSyncAccuracy: number;
    totalPredictions: number;
  }> {
    const twins = await this.getAll(schoolId);
    const active = twins.filter((t) => t.status === 'active');
    const totalPredictions = twins.reduce((sum, t) => sum + t.predictions.length, 0);

    return {
      total: twins.length,
      active: active.length,
      withAnomalies: twins.filter((t) => t.anomalies_detected > 0).length,
      averageSyncAccuracy: active.length > 0
        ? active.reduce((sum, t) => sum + t.sync_accuracy, 0) / active.length
        : 0,
      totalPredictions,
    };
  }
}
