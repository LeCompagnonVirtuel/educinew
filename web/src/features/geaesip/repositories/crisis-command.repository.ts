import { supabase } from '@educi/config';
import type {
  GeaesipCrisis,
  GeaesipCrisisTeam,
  GeaesipCrisisPlaybook,
  GeaesipEmergencyCommunication,
} from '@educi/types';

export class GeaesipCrisisRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_crisis')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des crises: ${error.message}`);
    return data as GeaesipCrisis[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_crisis')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Crisis ${id} introuvable: ${error.message}`);
    return data as GeaesipCrisis;
  }

  async create(data: Omit<GeaesipCrisis, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now, timeline: [] };

    const { data: result, error } = await this.client
      .from('geaesip_crisis')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la crise: ${error.message}`);
    return result as GeaesipCrisis;
  }

  async update(id: string, data: Partial<Omit<GeaesipCrisis, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_crisis')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la crise: ${error.message}`);
    return result as GeaesipCrisis;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_crisis')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la crise: ${error.message}`);
  }
}

export class GeaesipCrisisTeamRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_crisis_team')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des equipes de crise: ${error.message}`);
    return data as GeaesipCrisisTeam[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_crisis_team')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Equipe de crise ${id} introuvable: ${error.message}`);
    return data as GeaesipCrisisTeam;
  }

  async create(data: Omit<GeaesipCrisisTeam, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_crisis_team')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'equipe de crise: ${error.message}`);
    return result as GeaesipCrisisTeam;
  }

  async update(id: string, data: Partial<Omit<GeaesipCrisisTeam, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_crisis_team')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'equipe de crise: ${error.message}`);
    return result as GeaesipCrisisTeam;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_crisis_team')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'equipe de crise: ${error.message}`);
  }
}

export class GeaesipCrisisPlaybookRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_crisis_playbook')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des livres de jeu: ${error.message}`);
    return data as GeaesipCrisisPlaybook[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_crisis_playbook')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Livre de jeu ${id} introuvable: ${error.message}`);
    return data as GeaesipCrisisPlaybook;
  }

  async create(data: Omit<GeaesipCrisisPlaybook, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_crisis_playbook')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du livre de jeu: ${error.message}`);
    return result as GeaesipCrisisPlaybook;
  }

  async update(id: string, data: Partial<Omit<GeaesipCrisisPlaybook, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_crisis_playbook')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du livre de jeu: ${error.message}`);
    return result as GeaesipCrisisPlaybook;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_crisis_playbook')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du livre de jeu: ${error.message}`);
  }
}

export class GeaesipEmergencyCommunicationRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_emergency_communication')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des communications d'urgence: ${error.message}`);
    return data as GeaesipEmergencyCommunication[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_emergency_communication')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Communication d'urgence ${id} introuvable: ${error.message}`);
    return data as GeaesipEmergencyCommunication;
  }

  async create(data: Omit<GeaesipEmergencyCommunication, 'id' | 'sentAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), sentAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_emergency_communication')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la communication d'urgence: ${error.message}`);
    return result as GeaesipEmergencyCommunication;
  }

  async update(id: string, data: Partial<Omit<GeaesipEmergencyCommunication, 'id' | 'sentAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_emergency_communication')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la communication d'urgence: ${error.message}`);
    return result as GeaesipEmergencyCommunication;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_emergency_communication')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la communication d'urgence: ${error.message}`);
  }
}
