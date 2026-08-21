import { supabase } from '@educi/config';
import type {
  GeaesipDecision,
  GeaesipDecisionOption,
  GeaesipDecisionApproval,
  GeaesipDecisionAudit,
} from '@educi/types';

export class GeaesipDecisionRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_decision')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des decisions: ${error.message}`);
    return data as GeaesipDecision[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_decision')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Decision ${id} introuvable: ${error.message}`);
    return data as GeaesipDecision;
  }

  async create(data: Omit<GeaesipDecision, 'id' | 'createdAt' | 'updatedAt' | 'selectedOption'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now, selectedOption: null };

    const { data: result, error } = await this.client
      .from('geaesip_decision')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la decision: ${error.message}`);
    return result as GeaesipDecision;
  }

  async update(id: string, data: Partial<Omit<GeaesipDecision, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_decision')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la decision: ${error.message}`);
    return result as GeaesipDecision;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_decision')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la decision: ${error.message}`);
  }
}

export class GeaesipDecisionOptionRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_decision_option')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des options: ${error.message}`);
    return data as GeaesipDecisionOption[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_decision_option')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Option ${id} introuvable: ${error.message}`);
    return data as GeaesipDecisionOption;
  }

  async create(data: Omit<GeaesipDecisionOption, 'id'>) {
    const entity = { ...data, id: crypto.randomUUID() };

    const { data: result, error } = await this.client
      .from('geaesip_decision_option')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'option: ${error.message}`);
    return result as GeaesipDecisionOption;
  }

  async update(id: string, data: Partial<Omit<GeaesipDecisionOption, 'id'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_decision_option')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'option: ${error.message}`);
    return result as GeaesipDecisionOption;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_decision_option')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'option: ${error.message}`);
  }
}

export class GeaesipDecisionApprovalRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_decision_approval')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des approbations: ${error.message}`);
    return data as GeaesipDecisionApproval[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_decision_approval')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Approbation ${id} introuvable: ${error.message}`);
    return data as GeaesipDecisionApproval;
  }

  async create(data: Omit<GeaesipDecisionApproval, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_decision_approval')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'approbation: ${error.message}`);
    return result as GeaesipDecisionApproval;
  }

  async update(id: string, data: Partial<Omit<GeaesipDecisionApproval, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_decision_approval')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'approbation: ${error.message}`);
    return result as GeaesipDecisionApproval;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_decision_approval')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'approbation: ${error.message}`);
  }
}

export class GeaesipDecisionAuditRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_decision_audit')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des audits: ${error.message}`);
    return data as GeaesipDecisionAudit[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_decision_audit')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Audit ${id} introuvable: ${error.message}`);
    return data as GeaesipDecisionAudit;
  }

  async create(data: Omit<GeaesipDecisionAudit, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_decision_audit')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'audit: ${error.message}`);
    return result as GeaesipDecisionAudit;
  }

  async update(id: string, data: Partial<Omit<GeaesipDecisionAudit, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_decision_audit')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'audit: ${error.message}`);
    return result as GeaesipDecisionAudit;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_decision_audit')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'audit: ${error.message}`);
  }
}
