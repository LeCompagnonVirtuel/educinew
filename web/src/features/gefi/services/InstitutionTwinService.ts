import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface InstitutionTwin {
  id: string;
  school_id: string;
  twin_code: string;
  name: string;
  description: string;
  type: 'financial' | 'operational' | 'academic' | 'complete';
  status: 'active' | 'inactive' | 'syncing' | 'error';
  last_sync_at?: string;
  sync_frequency: 'real_time' | 'hourly' | 'daily' | 'weekly';
  data_sources: string[];
  metrics: TwinMetric[];
  configuration: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TwinMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  last_updated: string;
  source: string;
}

export interface TwinSimulation {
  id: string;
  twin_id: string;
  name: string;
  description: string;
  scenario: Record<string, unknown>;
  results: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  started_at?: string;
  completed_at?: string;
  school_id: string;
  created_at: string;
}

export interface CreateInstitutionTwin {
  name: string;
  description: string;
  type: 'financial' | 'operational' | 'academic' | 'complete';
  sync_frequency: 'real_time' | 'hourly' | 'daily' | 'weekly';
  data_sources: string[];
  configuration: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateInstitutionTwin {
  name?: string;
  description?: string;
  status?: string;
  sync_frequency?: string;
  data_sources?: string[];
  configuration?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class InstitutionTwinService {
  private readonly TABLE = 'institution_twins';
  private readonly SIMULATIONS_TABLE = 'twin_simulations';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<InstitutionTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<InstitutionTwin | null> {
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

  async create(schoolId: string, twin: CreateInstitutionTwin): Promise<InstitutionTwin> {
    const twinCode = `TW-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        twin_code: twinCode,
        ...twin,
        status: 'active',
        metrics: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, twin: UpdateInstitutionTwin): Promise<InstitutionTwin> {
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

  async sync(schoolId: string, id: string): Promise<InstitutionTwin> {
    const twin = await this.getById(schoolId, id);
    if (!twin) throw new Error('Twin not found');

    const updatedMetrics = twin.metrics.map((m) => ({
      ...m,
      value: m.value * (1 + (Math.random() - 0.5) * 0.1),
      last_updated: new Date().toISOString(),
    }));

    return this.update(schoolId, id, {
      metrics: updatedMetrics,
      last_sync_at: new Date().toISOString(),
    });
  }

  async getMetrics(schoolId: string, id: string): Promise<TwinMetric[]> {
    const twin = await this.getById(schoolId, id);
    if (!twin) throw new Error('Twin not found');
    return twin.metrics;
  }

  async updateMetric(schoolId: string, twinId: string, metricName: string, value: number, unit: string, source: string): Promise<InstitutionTwin> {
    const twin = await this.getById(schoolId, twinId);
    if (!twin) throw new Error('Twin not found');

    const existingMetricIndex = twin.metrics.findIndex((m) => m.name === metricName);
    const trend = existingMetricIndex >= 0
      ? value > twin.metrics[existingMetricIndex].value ? 'up' : value < twin.metrics[existingMetricIndex].value ? 'down' : 'stable'
      : 'stable';

    const newMetric: TwinMetric = {
      name: metricName,
      value,
      unit,
      trend,
      last_updated: new Date().toISOString(),
      source,
    };

    const updatedMetrics = existingMetricIndex >= 0
      ? twin.metrics.map((m, i) => i === existingMetricIndex ? newMetric : m)
      : [...twin.metrics, newMetric];

    return this.update(schoolId, twinId, { metrics: updatedMetrics });
  }

  async createSimulation(schoolId: string, twinId: string, name: string, description: string, scenario: Record<string, unknown>): Promise<TwinSimulation> {
    const { data, error } = await this.supabase
      .from(this.SIMULATIONS_TABLE)
      .insert({
        twin_id: twinId,
        name,
        description,
        scenario,
        results: {},
        status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async runSimulation(schoolId: string, simulationId: string): Promise<TwinSimulation> {
    const { data, error } = await this.supabase
      .from(this.SIMULATIONS_TABLE)
      .update({
        status: 'completed',
        results: { outcome: 'simulated', timestamp: new Date().toISOString() },
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', simulationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getSimulations(schoolId: string, twinId: string): Promise<TwinSimulation[]> {
    const { data, error } = await this.supabase
      .from(this.SIMULATIONS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('twin_id', twinId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<InstitutionTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, type: string): Promise<InstitutionTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }
}
