import { supabase } from '@educi/config';
import type {
  GeaesipCopilotSession,
  GeaesipCopilotAnswer,
  GeaesipCopilotExplanation,
} from '@educi/types';

export class GeaesipCopilotSessionRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_copilot_session')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des sessions copilot: ${error.message}`);
    return data as GeaesipCopilotSession[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_copilot_session')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Session copilot ${id} introuvable: ${error.message}`);
    return data as GeaesipCopilotSession;
  }

  async create(data: Omit<GeaesipCopilotSession, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_copilot_session')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la session copilot: ${error.message}`);
    return result as GeaesipCopilotSession;
  }

  async update(id: string, data: Partial<Omit<GeaesipCopilotSession, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_copilot_session')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la session copilot: ${error.message}`);
    return result as GeaesipCopilotSession;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_copilot_session')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la session copilot: ${error.message}`);
  }
}

export class GeaesipCopilotAnswerRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_copilot_answer')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des reponses copilot: ${error.message}`);
    return data as GeaesipCopilotAnswer[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_copilot_answer')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Reponse copilot ${id} introuvable: ${error.message}`);
    return data as GeaesipCopilotAnswer;
  }

  async create(data: Omit<GeaesipCopilotAnswer, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_copilot_answer')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la reponse copilot: ${error.message}`);
    return result as GeaesipCopilotAnswer;
  }

  async update(id: string, data: Partial<Omit<GeaesipCopilotAnswer, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_copilot_answer')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la reponse copilot: ${error.message}`);
    return result as GeaesipCopilotAnswer;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_copilot_answer')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la reponse copilot: ${error.message}`);
  }
}

export class GeaesipCopilotExplanationRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_copilot_explanation')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des explications copilot: ${error.message}`);
    return data as GeaesipCopilotExplanation[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_copilot_explanation')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Explication copilot ${id} introuvable: ${error.message}`);
    return data as GeaesipCopilotExplanation;
  }

  async create(data: Omit<GeaesipCopilotExplanation, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_copilot_explanation')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'explication copilot: ${error.message}`);
    return result as GeaesipCopilotExplanation;
  }

  async update(id: string, data: Partial<Omit<GeaesipCopilotExplanation, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_copilot_explanation')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'explication copilot: ${error.message}`);
    return result as GeaesipCopilotExplanation;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_copilot_explanation')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'explication copilot: ${error.message}`);
  }
}
