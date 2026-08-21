import { supabase } from '@educi/config';
import type {
  GeaesipResourceForecast,
  GeaesipAllocationPlan,
  GeaesipOptimizationResult,
} from '@educi/types';

export class GeaesipResourceForecastRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_resource_forecast')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des previsions de ressources: ${error.message}`);
    return data as GeaesipResourceForecast[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_resource_forecast')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Prevision de ressource ${id} introuvable: ${error.message}`);
    return data as GeaesipResourceForecast;
  }

  async create(data: Omit<GeaesipResourceForecast, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_resource_forecast')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la prevision de ressource: ${error.message}`);
    return result as GeaesipResourceForecast;
  }

  async update(id: string, data: Partial<Omit<GeaesipResourceForecast, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_resource_forecast')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la prevision de ressource: ${error.message}`);
    return result as GeaesipResourceForecast;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_resource_forecast')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la prevision de ressource: ${error.message}`);
  }
}

export class GeaesipAllocationPlanRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_allocation_plan')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des plans d'allocation: ${error.message}`);
    return data as GeaesipAllocationPlan[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_allocation_plan')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Plan d'allocation ${id} introuvable: ${error.message}`);
    return data as GeaesipAllocationPlan;
  }

  async create(data: Omit<GeaesipAllocationPlan, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_allocation_plan')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du plan d'allocation: ${error.message}`);
    return result as GeaesipAllocationPlan;
  }

  async update(id: string, data: Partial<Omit<GeaesipAllocationPlan, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_allocation_plan')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du plan d'allocation: ${error.message}`);
    return result as GeaesipAllocationPlan;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_allocation_plan')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du plan d'allocation: ${error.message}`);
  }
}

export class GeaesipOptimizationResultRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_optimization_result')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des resultats d'optimisation: ${error.message}`);
    return data as GeaesipOptimizationResult[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_optimization_result')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Resultat d'optimisation ${id} introuvable: ${error.message}`);
    return data as GeaesipOptimizationResult;
  }

  async create(data: Omit<GeaesipOptimizationResult, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_optimization_result')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du resultat d'optimisation: ${error.message}`);
    return result as GeaesipOptimizationResult;
  }

  async update(id: string, data: Partial<Omit<GeaesipOptimizationResult, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_optimization_result')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du resultat d'optimisation: ${error.message}`);
    return result as GeaesipOptimizationResult;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_optimization_result')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du resultat d'optimisation: ${error.message}`);
  }
}
