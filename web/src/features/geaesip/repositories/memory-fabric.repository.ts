import { supabase } from '@educi/config';
import type {
  GeaesipMemory,
  GeaesipMemoryRetrieval,
  GeaesipMemoryPolicy,
} from '@educi/types';

export class GeaesipMemoryRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_memory')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des memoires: ${error.message}`);
    return data as GeaesipMemory[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_memory')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Memoire ${id} introuvable: ${error.message}`);
    return data as GeaesipMemory;
  }

  async create(data: Omit<GeaesipMemory, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_memory')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la memoire: ${error.message}`);
    return result as GeaesipMemory;
  }

  async update(id: string, data: Partial<Omit<GeaesipMemory, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_memory')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la memoire: ${error.message}`);
    return result as GeaesipMemory;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_memory')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la memoire: ${error.message}`);
  }
}

export class GeaesipMemoryRetrievalRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_memory_retrieval')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des retrievals: ${error.message}`);
    return data as GeaesipMemoryRetrieval[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_memory_retrieval')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Retrieval ${id} introuvable: ${error.message}`);
    return data as GeaesipMemoryRetrieval;
  }

  async create(data: Omit<GeaesipMemoryRetrieval, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_memory_retrieval')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du retrieval: ${error.message}`);
    return result as GeaesipMemoryRetrieval;
  }

  async update(id: string, data: Partial<Omit<GeaesipMemoryRetrieval, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_memory_retrieval')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du retrieval: ${error.message}`);
    return result as GeaesipMemoryRetrieval;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_memory_retrieval')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du retrieval: ${error.message}`);
  }
}

export class GeaesipMemoryPolicyRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_memory_policy')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des politiques memoire: ${error.message}`);
    return data as GeaesipMemoryPolicy[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_memory_policy')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Politique memoire ${id} introuvable: ${error.message}`);
    return data as GeaesipMemoryPolicy;
  }

  async create(data: Omit<GeaesipMemoryPolicy, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_memory_policy')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la politique memoire: ${error.message}`);
    return result as GeaesipMemoryPolicy;
  }

  async update(id: string, data: Partial<Omit<GeaesipMemoryPolicy, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_memory_policy')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la politique memoire: ${error.message}`);
    return result as GeaesipMemoryPolicy;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_memory_policy')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la politique memoire: ${error.message}`);
  }
}
