import { supabase } from '@educi/config';
import type {
  GeaesipSystemTwin,
  GeaesipTwinState,
  GeaesipTwinSimulation,
} from '@educi/types';

export class GeaesipSystemTwinRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_system_twin')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des jumeaux: ${error.message}`);
    return data as GeaesipSystemTwin[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_system_twin')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Jumeau ${id} introuvable: ${error.message}`);
    return data as GeaesipSystemTwin;
  }

  async create(data: Omit<GeaesipSystemTwin, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_system_twin')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du jumeau: ${error.message}`);
    return result as GeaesipSystemTwin;
  }

  async update(id: string, data: Partial<Omit<GeaesipSystemTwin, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_system_twin')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du jumeau: ${error.message}`);
    return result as GeaesipSystemTwin;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_system_twin')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du jumeau: ${error.message}`);
  }
}

export class GeaesipTwinStateRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_twin_state')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des etats jumeau: ${error.message}`);
    return data as GeaesipTwinState[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_twin_state')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Etat jumeau ${id} introuvable: ${error.message}`);
    return data as GeaesipTwinState;
  }

  async create(data: Omit<GeaesipTwinState, 'id' | 'lastUpdated'>) {
    const entity = { ...data, id: crypto.randomUUID(), lastUpdated: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_twin_state')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'etat jumeau: ${error.message}`);
    return result as GeaesipTwinState;
  }

  async update(id: string, data: Partial<Omit<GeaesipTwinState, 'id' | 'lastUpdated'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_twin_state')
      .update({ ...data, lastUpdated: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'etat jumeau: ${error.message}`);
    return result as GeaesipTwinState;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_twin_state')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'etat jumeau: ${error.message}`);
  }
}

export class GeaesipTwinSimulationRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_twin_simulation')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des simulations jumeau: ${error.message}`);
    return data as GeaesipTwinSimulation[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_twin_simulation')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Simulation jumeau ${id} introuvable: ${error.message}`);
    return data as GeaesipTwinSimulation;
  }

  async create(data: Omit<GeaesipTwinSimulation, 'id' | 'createdAt' | 'completedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString(), completedAt: null };

    const { data: result, error } = await this.client
      .from('geaesip_twin_simulation')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la simulation jumeau: ${error.message}`);
    return result as GeaesipTwinSimulation;
  }

  async update(id: string, data: Partial<Omit<GeaesipTwinSimulation, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_twin_simulation')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la simulation jumeau: ${error.message}`);
    return result as GeaesipTwinSimulation;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_twin_simulation')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la simulation jumeau: ${error.message}`);
  }
}
