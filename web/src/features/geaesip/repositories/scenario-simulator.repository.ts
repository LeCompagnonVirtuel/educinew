import { supabase } from '@educi/config';
import type {
  GeaesipScenario,
  GeaesipScenarioRun,
  GeaesipScenarioComparison,
} from '@educi/types';

export class GeaesipScenarioRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_scenario')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des scenarios: ${error.message}`);
    return data as GeaesipScenario[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_scenario')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Scenario ${id} introuvable: ${error.message}`);
    return data as GeaesipScenario;
  }

  async create(data: Omit<GeaesipScenario, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_scenario')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du scenario: ${error.message}`);
    return result as GeaesipScenario;
  }

  async update(id: string, data: Partial<Omit<GeaesipScenario, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_scenario')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du scenario: ${error.message}`);
    return result as GeaesipScenario;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_scenario')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du scenario: ${error.message}`);
  }
}

export class GeaesipScenarioRunRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_scenario_run')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des executions: ${error.message}`);
    return data as GeaesipScenarioRun[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_scenario_run')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Execution ${id} introuvable: ${error.message}`);
    return data as GeaesipScenarioRun;
  }

  async create(data: Omit<GeaesipScenarioRun, 'id' | 'createdAt' | 'completedAt' | 'results' | 'impacts' | 'risks' | 'costs' | 'benefits' | 'probabilities' | 'timeline' | 'recommendations'>) {
    const entity = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completedAt: null,
      results: {},
      impacts: {},
      risks: [],
      costs: {},
      benefits: {},
      probabilities: {},
      timeline: [],
      recommendations: [],
    };

    const { data: result, error } = await this.client
      .from('geaesip_scenario_run')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'execution: ${error.message}`);
    return result as GeaesipScenarioRun;
  }

  async update(id: string, data: Partial<Omit<GeaesipScenarioRun, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_scenario_run')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'execution: ${error.message}`);
    return result as GeaesipScenarioRun;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_scenario_run')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'execution: ${error.message}`);
  }
}

export class GeaesipScenarioComparisonRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_scenario_comparison')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des comparaisons: ${error.message}`);
    return data as GeaesipScenarioComparison[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_scenario_comparison')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Comparaison ${id} introuvable: ${error.message}`);
    return data as GeaesipScenarioComparison;
  }

  async create(data: Omit<GeaesipScenarioComparison, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_scenario_comparison')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la comparaison: ${error.message}`);
    return result as GeaesipScenarioComparison;
  }

  async update(id: string, data: Partial<Omit<GeaesipScenarioComparison, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_scenario_comparison')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la comparaison: ${error.message}`);
    return result as GeaesipScenarioComparison;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_scenario_comparison')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la comparaison: ${error.message}`);
  }
}
