import { supabase } from '@educi/config';
import type {
  GeaesipAgentRegistry,
  GeaesipAgentMission,
  GeaesipAgentVote,
  GeaesipAgentNegotiation,
} from '@educi/types';

export class GeaesipAgentRegistryRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_registry')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des agents: ${error.message}`);
    return data as GeaesipAgentRegistry[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_registry')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Agent ${id} introuvable: ${error.message}`);
    return data as GeaesipAgentRegistry;
  }

  async create(data: Omit<GeaesipAgentRegistry, 'id' | 'createdAt' | 'updatedAt' | 'lastActiveAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now, lastActiveAt: null };

    const { data: result, error } = await this.client
      .from('geaesip_agent_registry')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'agent: ${error.message}`);
    return result as GeaesipAgentRegistry;
  }

  async update(id: string, data: Partial<Omit<GeaesipAgentRegistry, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_agent_registry')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'agent: ${error.message}`);
    return result as GeaesipAgentRegistry;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_agent_registry')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'agent: ${error.message}`);
  }
}

export class GeaesipAgentMissionRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_mission')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des missions: ${error.message}`);
    return data as GeaesipAgentMission[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_mission')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Mission ${id} introuvable: ${error.message}`);
    return data as GeaesipAgentMission;
  }

  async create(data: Omit<GeaesipAgentMission, 'id' | 'createdAt' | 'completedAt' | 'result' | 'score'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString(), completedAt: null, result: null, score: null };

    const { data: result, error } = await this.client
      .from('geaesip_agent_mission')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la mission: ${error.message}`);
    return result as GeaesipAgentMission;
  }

  async update(id: string, data: Partial<Omit<GeaesipAgentMission, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_agent_mission')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la mission: ${error.message}`);
    return result as GeaesipAgentMission;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_agent_mission')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la mission: ${error.message}`);
  }
}

export class GeaesipAgentVoteRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_vote')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des votes: ${error.message}`);
    return data as GeaesipAgentVote[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_vote')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Vote ${id} introuvable: ${error.message}`);
    return data as GeaesipAgentVote;
  }

  async create(data: Omit<GeaesipAgentVote, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_agent_vote')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du vote: ${error.message}`);
    return result as GeaesipAgentVote;
  }

  async update(id: string, data: Partial<Omit<GeaesipAgentVote, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_agent_vote')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du vote: ${error.message}`);
    return result as GeaesipAgentVote;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_agent_vote')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du vote: ${error.message}`);
  }
}

export class GeaesipAgentNegotiationRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_negotiation')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des negociations: ${error.message}`);
    return data as GeaesipAgentNegotiation[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_negotiation')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Negociation ${id} introuvable: ${error.message}`);
    return data as GeaesipAgentNegotiation;
  }

  async create(data: Omit<GeaesipAgentNegotiation, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_agent_negotiation')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la negociation: ${error.message}`);
    return result as GeaesipAgentNegotiation;
  }

  async update(id: string, data: Partial<Omit<GeaesipAgentNegotiation, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_agent_negotiation')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la negociation: ${error.message}`);
    return result as GeaesipAgentNegotiation;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_agent_negotiation')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la negociation: ${error.message}`);
  }
}
