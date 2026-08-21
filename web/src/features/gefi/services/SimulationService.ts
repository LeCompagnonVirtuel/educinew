import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Simulation {
  id: string;
  school_id: string;
  simulation_code: string;
  name: string;
  description: string;
  type: 'financial' | 'academic' | 'operational' | 'strategic' | 'combined';
  model_id?: string;
  parameters: SimulationParameter[];
  initial_state: Record<string, unknown>;
  results?: SimulationResult;
  status: 'draft' | 'ready' | 'running' | 'completed' | 'failed';
  runs_count: number;
  last_run_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SimulationParameter {
  name: string;
  type: 'number' | 'percentage' | 'boolean' | 'select';
  value: unknown;
  min_value?: number;
  max_value?: number;
  options?: string[];
  description: string;
}

export interface SimulationResult {
  metrics: SimulationMetric[];
  projections: SimulationProjection[];
  insights: string[];
  recommendations: string[];
  confidence_score: number;
  execution_time_ms: number;
}

export interface SimulationMetric {
  name: string;
  baseline: number;
  projected: number;
  change: number;
  change_percentage: number;
  unit: string;
}

export interface SimulationProjection {
  period: string;
  values: Record<string, number>;
}

export interface CreateSimulation {
  name: string;
  description: string;
  type: 'financial' | 'academic' | 'operational' | 'strategic' | 'combined';
  model_id?: string;
  parameters: SimulationParameter[];
  initial_state: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateSimulation {
  name?: string;
  description?: string;
  parameters?: SimulationParameter[];
  initial_state?: Record<string, unknown>;
  status?: string;
  metadata?: Record<string, unknown>;
}

export class SimulationService {
  private readonly TABLE = 'simulations';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Simulation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Simulation | null> {
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

  async create(schoolId: string, simulation: CreateSimulation): Promise<Simulation> {
    const simulationCode = `SIM-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        simulation_code: simulationCode,
        ...simulation,
        status: 'ready',
        runs_count: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, simulation: UpdateSimulation): Promise<Simulation> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...simulation, updated_at: new Date().toISOString() })
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

  async run(schoolId: string, id: string): Promise<Simulation> {
    const simulation = await this.getById(schoolId, id);
    if (!simulation) throw new Error('Simulation not found');

    const startTime = Date.now();
    const results = this.executeSimulation(simulation);
    const executionTime = Date.now() - startTime;

    const updatedResults: SimulationResult = {
      ...results,
      execution_time_ms: executionTime,
    };

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({
        results: updatedResults,
        status: 'completed',
        runs_count: simulation.runs_count + 1,
        last_run_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private executeSimulation(simulation: Simulation): Omit<SimulationResult, 'execution_time_ms'> {
    const metrics: SimulationMetric[] = [];
    const projections: SimulationProjection[] = [];

    const parameterMap = new Map(simulation.parameters.map((p) => [p.name, p.value]));

    metrics.push({
      name: 'Total Revenue',
      baseline: 1000000,
      projected: 1000000 * (1 + (parameterMap.get('revenue_growth') as number || 0) / 100),
      change: 1000000 * ((parameterMap.get('revenue_growth') as number || 0) / 100),
      change_percentage: (parameterMap.get('revenue_growth') as number) || 0,
      unit: 'XOF',
    });

    metrics.push({
      name: 'Total Expenses',
      baseline: 800000,
      projected: 800000 * (1 + (parameterMap.get('cost_increase') as number || 0) / 100),
      change: 800000 * ((parameterMap.get('cost_increase') as number || 0) / 100),
      change_percentage: (parameterMap.get('cost_increase') as number) || 0,
      unit: 'XOF',
    });

    const months = ['Q1', 'Q2', 'Q3', 'Q4'];
    months.forEach((period) => {
      projections.push({
        period,
        values: {
          revenue: metrics[0].projected / 4,
          expenses: metrics[1].projected / 4,
          profit: (metrics[0].projected - metrics[1].projected) / 4,
        },
      });
    });

    return {
      metrics,
      projections,
      insights: ['Revenue growth projection based on current trends', 'Cost management critical for profitability'],
      recommendations: ['Focus on high-margin programs', 'Optimize operational costs'],
      confidence_score: 75,
    };
  }

  async getByType(schoolId: string, type: string): Promise<Simulation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getCompleted(schoolId: string): Promise<Simulation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async clone(schoolId: string, id: string, name: string): Promise<Simulation> {
    const original = await this.getById(schoolId, id);
    if (!original) throw new Error('Simulation not found');

    return this.create(schoolId, {
      name,
      description: `Cloned from ${original.name}`,
      type: original.type,
      model_id: original.model_id,
      parameters: original.parameters,
      initial_state: original.initial_state,
    });
  }

  async compareResults(schoolId: string, simulationIds: string[]): Promise<{ id: string; name: string; results?: SimulationResult }[]> {
    const results: { id: string; name: string; results?: SimulationResult }[] = [];

    for (const id of simulationIds) {
      const simulation = await this.getById(schoolId, id);
      if (simulation) {
        results.push({
          id: simulation.id,
          name: simulation.name,
          results: simulation.results,
        });
      }
    }

    return results;
  }

  async getStats(schoolId: string): Promise<{ total: number; completed: number; totalRuns: number; averageConfidence: number }> {
    const simulations = await this.getAll(schoolId);
    const completed = simulations.filter((s) => s.status === 'completed');
    return {
      total: simulations.length,
      completed: completed.length,
      totalRuns: simulations.reduce((sum, s) => sum + s.runs_count, 0),
      averageConfidence: completed.length > 0
        ? completed.reduce((sum, s) => sum + (s.results?.confidence_score || 0), 0) / completed.length
        : 0,
    };
  }
}
