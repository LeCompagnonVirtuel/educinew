import { supabase } from '@educi/config';
import type {
  GeaesipEducationRuntime,
  GeaesipRuntimeExecution,
  GeaesipRuntimeMetric,
} from '@educi/types';

export class GeaesipEducationRuntimeRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_education_runtime')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des runtimes: ${error.message}`);
    return data as GeaesipEducationRuntime[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_education_runtime')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Runtime ${id} introuvable: ${error.message}`);
    return data as GeaesipEducationRuntime;
  }

  async create(data: Omit<GeaesipEducationRuntime, 'id' | 'createdAt' | 'updatedAt' | 'lastRunAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now, lastRunAt: null };

    const { data: result, error } = await this.client
      .from('geaesip_education_runtime')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du runtime: ${error.message}`);
    return result as GeaesipEducationRuntime;
  }

  async update(id: string, data: Partial<Omit<GeaesipEducationRuntime, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_education_runtime')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du runtime: ${error.message}`);
    return result as GeaesipEducationRuntime;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_education_runtime')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du runtime: ${error.message}`);
  }
}

export class GeaesipRuntimeExecutionRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_runtime_execution')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des executions runtime: ${error.message}`);
    return data as GeaesipRuntimeExecution[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_runtime_execution')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Execution runtime ${id} introuvable: ${error.message}`);
    return data as GeaesipRuntimeExecution;
  }

  async create(data: Omit<GeaesipRuntimeExecution, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_runtime_execution')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'execution runtime: ${error.message}`);
    return result as GeaesipRuntimeExecution;
  }

  async update(id: string, data: Partial<Omit<GeaesipRuntimeExecution, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_runtime_execution')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'execution runtime: ${error.message}`);
    return result as GeaesipRuntimeExecution;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_runtime_execution')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'execution runtime: ${error.message}`);
  }
}

export class GeaesipRuntimeMetricRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_runtime_metric')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des metriques runtime: ${error.message}`);
    return data as GeaesipRuntimeMetric[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_runtime_metric')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Metrique runtime ${id} introuvable: ${error.message}`);
    return data as GeaesipRuntimeMetric;
  }

  async create(data: Omit<GeaesipRuntimeMetric, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_runtime_metric')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la metrique runtime: ${error.message}`);
    return result as GeaesipRuntimeMetric;
  }

  async update(id: string, data: Partial<Omit<GeaesipRuntimeMetric, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_runtime_metric')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la metrique runtime: ${error.message}`);
    return result as GeaesipRuntimeMetric;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_runtime_metric')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la metrique runtime: ${error.message}`);
  }
}
