import { supabase } from '@educi/config';
import type {
  GeaesipControlCenter,
  GeaesipExecutiveCockpit,
  GeaesipAlert,
  GeaesipDecisionQueue,
} from '@educi/types';

export class GeaesipControlCenterRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_control_center')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des centres de contrôle: ${error.message}`);
    return data as GeaesipControlCenter[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_control_center')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Centre de contrôle ${id} introuvable: ${error.message}`);
    return data as GeaesipControlCenter;
  }

  async create(data: Omit<GeaesipControlCenter, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_control_center')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création du centre de contrôle: ${error.message}`);
    return result as GeaesipControlCenter;
  }

  async update(id: string, data: Partial<Omit<GeaesipControlCenter, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_control_center')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour du centre de contrôle: ${error.message}`);
    return result as GeaesipControlCenter;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_control_center')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du centre de contrôle: ${error.message}`);
  }
}

export class GeaesipExecutiveCockpitRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_executive_cockpit')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des cockpits: ${error.message}`);
    return data as GeaesipExecutiveCockpit[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_executive_cockpit')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Cockpit ${id} introuvable: ${error.message}`);
    return data as GeaesipExecutiveCockpit;
  }

  async create(data: Omit<GeaesipExecutiveCockpit, 'id' | 'computedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), computedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_executive_cockpit')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création du cockpit: ${error.message}`);
    return result as GeaesipExecutiveCockpit;
  }

  async update(id: string, data: Partial<Omit<GeaesipExecutiveCockpit, 'id' | 'computedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_executive_cockpit')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour du cockpit: ${error.message}`);
    return result as GeaesipExecutiveCockpit;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_executive_cockpit')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du cockpit: ${error.message}`);
  }
}

export class GeaesipAlertRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_alert')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des alertes: ${error.message}`);
    return data as GeaesipAlert[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_alert')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Alerte ${id} introuvable: ${error.message}`);
    return data as GeaesipAlert;
  }

  async create(data: Omit<GeaesipAlert, 'id' | 'createdAt' | 'acknowledged' | 'acknowledgedBy'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString(), acknowledged: false, acknowledgedBy: null };

    const { data: result, error } = await this.client
      .from('geaesip_alert')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création de l'alerte: ${error.message}`);
    return result as GeaesipAlert;
  }

  async update(id: string, data: Partial<Omit<GeaesipAlert, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_alert')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour de l'alerte: ${error.message}`);
    return result as GeaesipAlert;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_alert')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'alerte: ${error.message}`);
  }
}

export class GeaesipDecisionQueueRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_decision_queue')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la récupération des files de décision: ${error.message}`);
    return data as GeaesipDecisionQueue[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_decision_queue')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`File de décision ${id} introuvable: ${error.message}`);
    return data as GeaesipDecisionQueue;
  }

  async create(data: Omit<GeaesipDecisionQueue, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_decision_queue')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la création de la file de décision: ${error.message}`);
    return result as GeaesipDecisionQueue;
  }

  async update(id: string, data: Partial<Omit<GeaesipDecisionQueue, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_decision_queue')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise à jour de la file de décision: ${error.message}`);
    return result as GeaesipDecisionQueue;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_decision_queue')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la file de décision: ${error.message}`);
  }
}
