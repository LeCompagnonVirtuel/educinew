import { supabase } from '@educi/config';
import type {
  GeaesipImpactModel,
  GeaesipImpactResult,
  GeaesipEconomicForecast,
  GeaesipHumanCapitalIndex,
} from '@educi/types';

export class GeaesipImpactModelRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_impact_model')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des modeles d'impact: ${error.message}`);
    return data as GeaesipImpactModel[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_impact_model')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Modele d'impact ${id} introuvable: ${error.message}`);
    return data as GeaesipImpactModel;
  }

  async create(data: Omit<GeaesipImpactModel, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_impact_model')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du modele d'impact: ${error.message}`);
    return result as GeaesipImpactModel;
  }

  async update(id: string, data: Partial<Omit<GeaesipImpactModel, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_impact_model')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du modele d'impact: ${error.message}`);
    return result as GeaesipImpactModel;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_impact_model')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du modele d'impact: ${error.message}`);
  }
}

export class GeaesipImpactResultRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_impact_result')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des resultats d'impact: ${error.message}`);
    return data as GeaesipImpactResult[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_impact_result')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Resultat d'impact ${id} introuvable: ${error.message}`);
    return data as GeaesipImpactResult;
  }

  async create(data: Omit<GeaesipImpactResult, 'id' | 'calculatedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), calculatedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_impact_result')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du resultat d'impact: ${error.message}`);
    return result as GeaesipImpactResult;
  }

  async update(id: string, data: Partial<Omit<GeaesipImpactResult, 'id' | 'calculatedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_impact_result')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du resultat d'impact: ${error.message}`);
    return result as GeaesipImpactResult;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_impact_result')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du resultat d'impact: ${error.message}`);
  }
}

export class GeaesipEconomicForecastRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_economic_forecast')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des previsions economiques: ${error.message}`);
    return data as GeaesipEconomicForecast[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_economic_forecast')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Prevision economique ${id} introuvable: ${error.message}`);
    return data as GeaesipEconomicForecast;
  }

  async create(data: Omit<GeaesipEconomicForecast, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_economic_forecast')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la prevision economique: ${error.message}`);
    return result as GeaesipEconomicForecast;
  }

  async update(id: string, data: Partial<Omit<GeaesipEconomicForecast, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_economic_forecast')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la prevision economique: ${error.message}`);
    return result as GeaesipEconomicForecast;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_economic_forecast')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la prevision economique: ${error.message}`);
  }
}

export class GeaesipHumanCapitalIndexRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_human_capital_index')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des indices de capital humain: ${error.message}`);
    return data as GeaesipHumanCapitalIndex[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_human_capital_index')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Indice de capital humain ${id} introuvable: ${error.message}`);
    return data as GeaesipHumanCapitalIndex;
  }

  async create(data: Omit<GeaesipHumanCapitalIndex, 'id' | 'computedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), computedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_human_capital_index')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'indice de capital humain: ${error.message}`);
    return result as GeaesipHumanCapitalIndex;
  }

  async update(id: string, data: Partial<Omit<GeaesipHumanCapitalIndex, 'id' | 'computedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_human_capital_index')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'indice de capital humain: ${error.message}`);
    return result as GeaesipHumanCapitalIndex;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_human_capital_index')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'indice de capital humain: ${error.message}`);
  }
}
