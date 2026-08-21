import { supabase } from '@educi/config';
import type {
  GeaesipCrossDomainEvent,
  GeaesipCorrelation,
  GeaesipImpactChain,
  GeaesipSystemicRisk,
  GeaesipDependencyGraph,
} from '@educi/types';

export class GeaesipCrossDomainEventRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_cross_domain_event')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des événements: ${error.message}`);
    return data as GeaesipCrossDomainEvent[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_cross_domain_event')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Événement ${id} introuvable: ${error.message}`);
    return data as GeaesipCrossDomainEvent;
  }

  async create(data: Omit<GeaesipCrossDomainEvent, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_cross_domain_event')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création de l'événement: ${error.message}`);
    return result as GeaesipCrossDomainEvent;
  }

  async update(id: string, data: Partial<Omit<GeaesipCrossDomainEvent, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_cross_domain_event')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour de l'événement: ${error.message}`);
    return result as GeaesipCrossDomainEvent;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_cross_domain_event')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'événement: ${error.message}`);
  }
}

export class GeaesipCorrelationRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_correlation')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des corrélations: ${error.message}`);
    return data as GeaesipCorrelation[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_correlation')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Corrélation ${id} introuvable: ${error.message}`);
    return data as GeaesipCorrelation;
  }

  async create(data: Omit<GeaesipCorrelation, 'id' | 'discoveredAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), discoveredAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_correlation')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création de la corrélation: ${error.message}`);
    return result as GeaesipCorrelation;
  }

  async update(id: string, data: Partial<Omit<GeaesipCorrelation, 'id' | 'discoveredAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_correlation')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour de la corrélation: ${error.message}`);
    return result as GeaesipCorrelation;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_correlation')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la corrélation: ${error.message}`);
  }
}

export class GeaesipImpactChainRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_impact_chain')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des chaînes d'impact: ${error.message}`);
    return data as GeaesipImpactChain[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_impact_chain')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Chaîne d'impact ${id} introuvable: ${error.message}`);
    return data as GeaesipImpactChain;
  }

  async create(data: Omit<GeaesipImpactChain, 'id' | 'detectedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), detectedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_impact_chain')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création de la chaîne d'impact: ${error.message}`);
    return result as GeaesipImpactChain;
  }

  async update(id: string, data: Partial<Omit<GeaesipImpactChain, 'id' | 'detectedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_impact_chain')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour de la chaîne d'impact: ${error.message}`);
    return result as GeaesipImpactChain;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_impact_chain')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la chaîne d'impact: ${error.message}`);
  }
}

export class GeaesipSystemicRiskRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_systemic_risk')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des risques systémiques: ${error.message}`);
    return data as GeaesipSystemicRisk[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_systemic_risk')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Risque systémique ${id} introuvable: ${error.message}`);
    return data as GeaesipSystemicRisk;
  }

  async create(data: Omit<GeaesipSystemicRisk, 'id' | 'lastAssessedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), lastAssessedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_systemic_risk')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création du risque systémique: ${error.message}`);
    return result as GeaesipSystemicRisk;
  }

  async update(id: string, data: Partial<Omit<GeaesipSystemicRisk, 'id' | 'lastAssessedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_systemic_risk')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour du risque systémique: ${error.message}`);
    return result as GeaesipSystemicRisk;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_systemic_risk')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du risque systémique: ${error.message}`);
  }
}

export class GeaesipDependencyGraphRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_dependency_graph')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des graphes de dépendance: ${error.message}`);
    return data as GeaesipDependencyGraph[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_dependency_graph')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Graphe de dépendance ${id} introuvable: ${error.message}`);
    return data as GeaesipDependencyGraph;
  }

  async create(data: Omit<GeaesipDependencyGraph, 'id' | 'lastComputedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), lastComputedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_dependency_graph')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création du graphe de dépendance: ${error.message}`);
    return result as GeaesipDependencyGraph;
  }

  async update(id: string, data: Partial<Omit<GeaesipDependencyGraph, 'id' | 'lastComputedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_dependency_graph')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour du graphe de dépendance: ${error.message}`);
    return result as GeaesipDependencyGraph;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_dependency_graph')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du graphe de dépendance: ${error.message}`);
  }
}
