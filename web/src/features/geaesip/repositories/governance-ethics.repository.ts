import { supabase } from '@educi/config';
import type {
  GeaesipGovernancePolicy,
  GeaesipGovernanceAudit,
  GeaesipEthicsReview,
  GeaesipBiasReview,
} from '@educi/types';

export class GeaesipGovernancePolicyRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_governance_policy')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des politiques de gouvernance: ${error.message}`);
    return data as GeaesipGovernancePolicy[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_governance_policy')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Politique de gouvernance ${id} introuvable: ${error.message}`);
    return data as GeaesipGovernancePolicy;
  }

  async create(data: Omit<GeaesipGovernancePolicy, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_governance_policy')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la politique de gouvernance: ${error.message}`);
    return result as GeaesipGovernancePolicy;
  }

  async update(id: string, data: Partial<Omit<GeaesipGovernancePolicy, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_governance_policy')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la politique de gouvernance: ${error.message}`);
    return result as GeaesipGovernancePolicy;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_governance_policy')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la politique de gouvernance: ${error.message}`);
  }
}

export class GeaesipGovernanceAuditRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_governance_audit')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des audits de gouvernance: ${error.message}`);
    return data as GeaesipGovernanceAudit[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_governance_audit')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Audit de gouvernance ${id} introuvable: ${error.message}`);
    return data as GeaesipGovernanceAudit;
  }

  async create(data: Omit<GeaesipGovernanceAudit, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_governance_audit')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'audit de gouvernance: ${error.message}`);
    return result as GeaesipGovernanceAudit;
  }

  async update(id: string, data: Partial<Omit<GeaesipGovernanceAudit, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_governance_audit')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'audit de gouvernance: ${error.message}`);
    return result as GeaesipGovernanceAudit;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_governance_audit')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'audit de gouvernance: ${error.message}`);
  }
}

export class GeaesipEthicsReviewRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_ethics_review')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des revues d'ethique: ${error.message}`);
    return data as GeaesipEthicsReview[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_ethics_review')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Revue d'ethique ${id} introuvable: ${error.message}`);
    return data as GeaesipEthicsReview;
  }

  async create(data: Omit<GeaesipEthicsReview, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_ethics_review')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la revue d'ethique: ${error.message}`);
    return result as GeaesipEthicsReview;
  }

  async update(id: string, data: Partial<Omit<GeaesipEthicsReview, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_ethics_review')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la revue d'ethique: ${error.message}`);
    return result as GeaesipEthicsReview;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_ethics_review')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la revue d'ethique: ${error.message}`);
  }
}

export class GeaesipBiasReviewRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_bias_review')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des revues de biais: ${error.message}`);
    return data as GeaesipBiasReview[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_bias_review')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Revue de biais ${id} introuvable: ${error.message}`);
    return data as GeaesipBiasReview;
  }

  async create(data: Omit<GeaesipBiasReview, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_bias_review')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la revue de biais: ${error.message}`);
    return result as GeaesipBiasReview;
  }

  async update(id: string, data: Partial<Omit<GeaesipBiasReview, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_bias_review')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la revue de biais: ${error.message}`);
    return result as GeaesipBiasReview;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_bias_review')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la revue de biais: ${error.message}`);
  }
}
