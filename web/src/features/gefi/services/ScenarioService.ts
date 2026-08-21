import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Scenario {
  id: string;
  school_id: string;
  scenario_code: string;
  name: string;
  description: string;
  type: 'base' | 'optimistic' | 'pessimistic' | 'stress' | 'custom';
  assumptions: Record<string, unknown>;
  parameters: ScenarioParameter[];
  results?: ScenarioResult;
  status: 'draft' | 'validated' | 'archived';
  validated_by?: string;
  validated_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ScenarioParameter {
  name: string;
  value: number;
  min_value: number;
  max_value: number;
  unit: string;
  description: string;
}

export interface ScenarioResult {
  total_impact: number;
  risk_score: number;
  probability: number;
  key_findings: string[];
  recommendations: string[];
  data_points: Record<string, unknown>[];
}

export interface CreateScenario {
  name: string;
  description: string;
  type: 'base' | 'optimistic' | 'pessimistic' | 'stress' | 'custom';
  assumptions: Record<string, unknown>;
  parameters: ScenarioParameter[];
  metadata?: Record<string, unknown>;
}

export interface UpdateScenario {
  name?: string;
  description?: string;
  assumptions?: Record<string, unknown>;
  parameters?: ScenarioParameter[];
  results?: ScenarioResult;
  status?: string;
  metadata?: Record<string, unknown>;
}

export class ScenarioService {
  private readonly TABLE = 'scenarios';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Scenario[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Scenario | null> {
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

  async create(schoolId: string, scenario: CreateScenario): Promise<Scenario> {
    const scenarioCode = `SCN-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        scenario_code: scenarioCode,
        ...scenario,
        status: 'draft',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, scenario: UpdateScenario): Promise<Scenario> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...scenario, updated_at: new Date().toISOString() })
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

  async validate(schoolId: string, id: string, validatedBy: string): Promise<Scenario> {
    return this.update(schoolId, id, {
      status: 'validated',
      validated_by: validatedBy,
      validated_at: new Date().toISOString(),
    });
  }

  async runScenario(schoolId: string, id: string): Promise<Scenario> {
    const scenario = await this.getById(schoolId, id);
    if (!scenario) throw new Error('Scenario not found');

    const results = this.calculateResults(scenario);
    return this.update(schoolId, id, { results });
  }

  private calculateResults(scenario: Scenario): ScenarioResult {
    const totalImpact = scenario.parameters.reduce((sum, p) => sum + p.value, 0);
    const riskScore = Math.min(100, Math.max(0, 50 + (scenario.type === 'pessimistic' ? 30 : scenario.type === 'optimistic' ? -30 : 0)));
    const probability = scenario.type === 'base' ? 60 : scenario.type === 'optimistic' ? 30 : scenario.type === 'pessimistic' ? 70 : 50;

    return {
      total_impact: totalImpact,
      risk_score: riskScore,
      probability,
      key_findings: [`Scenario ${scenario.name} analysis completed`, `Total impact: ${totalImpact}`],
      recommendations: ['Review assumptions', 'Monitor key indicators'],
      data_points: scenario.parameters.map((p) => ({ name: p.name, value: p.value })),
    };
  }

  async getByType(schoolId: string, type: string): Promise<Scenario[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getValidated(schoolId: string): Promise<Scenario[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'validated')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async compareScenarios(schoolId: string, scenarioIds: string[]): Promise<{ id: string; name: string; type: string; results?: ScenarioResult }[]> {
    const results: { id: string; name: string; type: string; results?: ScenarioResult }[] = [];

    for (const id of scenarioIds) {
      const scenario = await this.getById(schoolId, id);
      if (scenario) {
        results.push({
          id: scenario.id,
          name: scenario.name,
          type: scenario.type,
          results: scenario.results,
        });
      }
    }

    return results;
  }

  async sensitivityAnalysis(schoolId: string, id: string, paramName: string, variationPercent: number): Promise<{ parameter: string; originalValue: number; variedValue: number; impact: number }[]> {
    const scenario = await this.getById(schoolId, id);
    if (!scenario) throw new Error('Scenario not found');

    const param = scenario.parameters.find((p) => p.name === paramName);
    if (!param) throw new Error('Parameter not found');

    const variedValue = param.value * (1 + variationPercent / 100);
    const impact = variedValue - param.value;

    return [{
      parameter: paramName,
      originalValue: param.value,
      variedValue,
      impact,
    }];
  }
}
