import { supabase } from '@educi/config';
import type {
  GeaesipAIEvaluation,
  GeaesipModelEvaluation,
  GeaesipAgentEvaluation,
} from '@educi/types';

export class GeaesipAIEvaluationRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_ai_evaluation')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des evaluations IA: ${error.message}`);
    return data as GeaesipAIEvaluation[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_ai_evaluation')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Evaluation IA ${id} introuvable: ${error.message}`);
    return data as GeaesipAIEvaluation;
  }

  async create(data: Omit<GeaesipAIEvaluation, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_ai_evaluation')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'evaluation IA: ${error.message}`);
    return result as GeaesipAIEvaluation;
  }

  async update(id: string, data: Partial<Omit<GeaesipAIEvaluation, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_ai_evaluation')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'evaluation IA: ${error.message}`);
    return result as GeaesipAIEvaluation;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_ai_evaluation')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'evaluation IA: ${error.message}`);
  }
}

export class GeaesipModelEvaluationRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_model_evaluation')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des evaluations de modele: ${error.message}`);
    return data as GeaesipModelEvaluation[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_model_evaluation')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Evaluation de modele ${id} introuvable: ${error.message}`);
    return data as GeaesipModelEvaluation;
  }

  async create(data: Omit<GeaesipModelEvaluation, 'id' | 'evaluatedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), evaluatedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_model_evaluation')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'evaluation de modele: ${error.message}`);
    return result as GeaesipModelEvaluation;
  }

  async update(id: string, data: Partial<Omit<GeaesipModelEvaluation, 'id' | 'evaluatedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_model_evaluation')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'evaluation de modele: ${error.message}`);
    return result as GeaesipModelEvaluation;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_model_evaluation')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'evaluation de modele: ${error.message}`);
  }
}

export class GeaesipAgentEvaluationRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_evaluation')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des evaluations d'agent: ${error.message}`);
    return data as GeaesipAgentEvaluation[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_agent_evaluation')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Evaluation d'agent ${id} introuvable: ${error.message}`);
    return data as GeaesipAgentEvaluation;
  }

  async create(data: Omit<GeaesipAgentEvaluation, 'id' | 'evaluatedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), evaluatedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_agent_evaluation')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'evaluation d'agent: ${error.message}`);
    return result as GeaesipAgentEvaluation;
  }

  async update(id: string, data: Partial<Omit<GeaesipAgentEvaluation, 'id' | 'evaluatedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_agent_evaluation')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'evaluation d'agent: ${error.message}`);
    return result as GeaesipAgentEvaluation;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_agent_evaluation')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'evaluation d'agent: ${error.message}`);
  }
}
