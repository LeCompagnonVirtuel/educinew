import { supabase } from '@educi/config';
import type {
  GeaesipIntelligenceAPI,
  GeaesipEventBus,
  GeaesipEventSubscription,
  GeaesipAPIUsage,
} from '@educi/types';

export class GeaesipIntelligenceAPIRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_intelligence_api')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des APIs: ${error.message}`);
    return data as GeaesipIntelligenceAPI[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_intelligence_api')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`API ${id} introuvable: ${error.message}`);
    return data as GeaesipIntelligenceAPI;
  }

  async create(data: Omit<GeaesipIntelligenceAPI, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_intelligence_api')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'API: ${error.message}`);
    return result as GeaesipIntelligenceAPI;
  }

  async update(id: string, data: Partial<Omit<GeaesipIntelligenceAPI, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_intelligence_api')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'API: ${error.message}`);
    return result as GeaesipIntelligenceAPI;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_intelligence_api')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'API: ${error.message}`);
  }
}

export class GeaesipEventBusRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_event_bus')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des bus d'evenements: ${error.message}`);
    return data as GeaesipEventBus[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_event_bus')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Bus d'evenements ${id} introuvable: ${error.message}`);
    return data as GeaesipEventBus;
  }

  async create(data: Omit<GeaesipEventBus, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_event_bus')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du bus d'evenements: ${error.message}`);
    return result as GeaesipEventBus;
  }

  async update(id: string, data: Partial<Omit<GeaesipEventBus, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_event_bus')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du bus d'evenements: ${error.message}`);
    return result as GeaesipEventBus;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_event_bus')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du bus d'evenements: ${error.message}`);
  }
}

export class GeaesipEventSubscriptionRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_event_subscription')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des abonnements: ${error.message}`);
    return data as GeaesipEventSubscription[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_event_subscription')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Abonnement ${id} introuvable: ${error.message}`);
    return data as GeaesipEventSubscription;
  }

  async create(data: Omit<GeaesipEventSubscription, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_event_subscription')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'abonnement: ${error.message}`);
    return result as GeaesipEventSubscription;
  }

  async update(id: string, data: Partial<Omit<GeaesipEventSubscription, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_event_subscription')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'abonnement: ${error.message}`);
    return result as GeaesipEventSubscription;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_event_subscription')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'abonnement: ${error.message}`);
  }
}

export class GeaesipAPIUsageRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_api_usage')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des usages API: ${error.message}`);
    return data as GeaesipAPIUsage[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_api_usage')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Usage API ${id} introuvable: ${error.message}`);
    return data as GeaesipAPIUsage;
  }

  async create(data: Omit<GeaesipAPIUsage, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_api_usage')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'usage API: ${error.message}`);
    return result as GeaesipAPIUsage;
  }

  async update(id: string, data: Partial<Omit<GeaesipAPIUsage, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_api_usage')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'usage API: ${error.message}`);
    return result as GeaesipAPIUsage;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_api_usage')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'usage API: ${error.message}`);
  }
}
