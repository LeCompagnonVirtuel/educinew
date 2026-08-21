import { supabase } from '@educi/config';
import type {
  GeaesipIntelligenceCore,
  GeaesipKnowledgeFusion,
  GeaesipCrossDomainSignal,
  GeaesipCausalRelationship,
  GeaesipSystemHealthScore,
} from '@educi/types';

export class GeaesipIntelligenceCoreRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_intelligence_core')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des intelligences: ${error.message}`);
    return data as GeaesipIntelligenceCore[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_intelligence_core')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Intelligence ${id} introuvable: ${error.message}`);
    return data as GeaesipIntelligenceCore;
  }

  async create(data: Omit<GeaesipIntelligenceCore, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_intelligence_core')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création de l'intelligence: ${error.message}`);
    return result as GeaesipIntelligenceCore;
  }

  async update(id: string, data: Partial<Omit<GeaesipIntelligenceCore, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_intelligence_core')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour de l'intelligence: ${error.message}`);
    return result as GeaesipIntelligenceCore;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_intelligence_core')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'intelligence: ${error.message}`);
  }
}

export class GeaesipKnowledgeFusionRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_knowledge_fusion')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des fusions: ${error.message}`);
    return data as GeaesipKnowledgeFusion[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_knowledge_fusion')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Fusion ${id} introuvable: ${error.message}`);
    return data as GeaesipKnowledgeFusion;
  }

  async create(data: Omit<GeaesipKnowledgeFusion, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_knowledge_fusion')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création de la fusion: ${error.message}`);
    return result as GeaesipKnowledgeFusion;
  }

  async update(id: string, data: Partial<Omit<GeaesipKnowledgeFusion, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_knowledge_fusion')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour de la fusion: ${error.message}`);
    return result as GeaesipKnowledgeFusion;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_knowledge_fusion')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la fusion: ${error.message}`);
  }
}

export class GeaesipCrossDomainSignalRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_cross_domain_signal')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des signaux: ${error.message}`);
    return data as GeaesipCrossDomainSignal[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_cross_domain_signal')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Signal ${id} introuvable: ${error.message}`);
    return data as GeaesipCrossDomainSignal;
  }

  async create(data: Omit<GeaesipCrossDomainSignal, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_cross_domain_signal')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création du signal: ${error.message}`);
    return result as GeaesipCrossDomainSignal;
  }

  async update(id: string, data: Partial<Omit<GeaesipCrossDomainSignal, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_cross_domain_signal')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour du signal: ${error.message}`);
    return result as GeaesipCrossDomainSignal;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_cross_domain_signal')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du signal: ${error.message}`);
  }
}

export class GeaesipCausalRelationshipRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_causal_relationship')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des relations causales: ${error.message}`);
    return data as GeaesipCausalRelationship[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_causal_relationship')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Relation causale ${id} introuvable: ${error.message}`);
    return data as GeaesipCausalRelationship;
  }

  async create(data: Omit<GeaesipCausalRelationship, 'id' | 'discoveredAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), discoveredAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_causal_relationship')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création de la relation causale: ${error.message}`);
    return result as GeaesipCausalRelationship;
  }

  async update(id: string, data: Partial<Omit<GeaesipCausalRelationship, 'id' | 'discoveredAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_causal_relationship')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour de la relation causale: ${error.message}`);
    return result as GeaesipCausalRelationship;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_causal_relationship')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la relation causale: ${error.message}`);
  }
}

export class GeaesipSystemHealthScoreRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_system_health_score')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des scores de santé: ${error.message}`);
    return data as GeaesipSystemHealthScore[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_system_health_score')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Score de santé ${id} introuvable: ${error.message}`);
    return data as GeaesipSystemHealthScore;
  }

  async create(data: Omit<GeaesipSystemHealthScore, 'id' | 'computedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), computedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_system_health_score')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création du score de santé: ${error.message}`);
    return result as GeaesipSystemHealthScore;
  }

  async update(id: string, data: Partial<Omit<GeaesipSystemHealthScore, 'id' | 'computedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_system_health_score')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour du score de santé: ${error.message}`);
    return result as GeaesipSystemHealthScore;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_system_health_score')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du score de santé: ${error.message}`);
  }
}
