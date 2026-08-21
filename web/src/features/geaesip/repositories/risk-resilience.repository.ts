import { supabase } from '@educi/config';
import type {
  GeaesipRiskRegistry,
  GeaesipRiskMatrix,
  GeaesipEarlyWarning,
  GeaesipMitigationPlan,
} from '@educi/types';

export class GeaesipRiskRegistryRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_risk_registry')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des risques: ${error.message}`);
    return data as GeaesipRiskRegistry[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_risk_registry')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Risque ${id} introuvable: ${error.message}`);
    return data as GeaesipRiskRegistry;
  }

  async create(data: Omit<GeaesipRiskRegistry, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_risk_registry')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du risque: ${error.message}`);
    return result as GeaesipRiskRegistry;
  }

  async update(id: string, data: Partial<Omit<GeaesipRiskRegistry, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_risk_registry')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du risque: ${error.message}`);
    return result as GeaesipRiskRegistry;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_risk_registry')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du risque: ${error.message}`);
  }
}

export class GeaesipRiskMatrixRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_risk_matrix')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des matrices de risque: ${error.message}`);
    return data as GeaesipRiskMatrix[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_risk_matrix')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Matrice de risque ${id} introuvable: ${error.message}`);
    return data as GeaesipRiskMatrix;
  }

  async create(data: Omit<GeaesipRiskMatrix, 'id' | 'computedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), computedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_risk_matrix')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la matrice de risque: ${error.message}`);
    return result as GeaesipRiskMatrix;
  }

  async update(id: string, data: Partial<Omit<GeaesipRiskMatrix, 'id' | 'computedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_risk_matrix')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la matrice de risque: ${error.message}`);
    return result as GeaesipRiskMatrix;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_risk_matrix')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la matrice de risque: ${error.message}`);
  }
}

export class GeaesipEarlyWarningRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_early_warning')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des alertes precoces: ${error.message}`);
    return data as GeaesipEarlyWarning[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_early_warning')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Alerte precoce ${id} introuvable: ${error.message}`);
    return data as GeaesipEarlyWarning;
  }

  async create(data: Omit<GeaesipEarlyWarning, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_early_warning')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'alerte precoce: ${error.message}`);
    return result as GeaesipEarlyWarning;
  }

  async update(id: string, data: Partial<Omit<GeaesipEarlyWarning, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_early_warning')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'alerte precoce: ${error.message}`);
    return result as GeaesipEarlyWarning;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_early_warning')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'alerte precoce: ${error.message}`);
  }
}

export class GeaesipMitigationPlanRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_mitigation_plan')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des plans de mitigation: ${error.message}`);
    return data as GeaesipMitigationPlan[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_mitigation_plan')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Plan de mitigation ${id} introuvable: ${error.message}`);
    return data as GeaesipMitigationPlan;
  }

  async create(data: Omit<GeaesipMitigationPlan, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_mitigation_plan')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du plan de mitigation: ${error.message}`);
    return result as GeaesipMitigationPlan;
  }

  async update(id: string, data: Partial<Omit<GeaesipMitigationPlan, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_mitigation_plan')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du plan de mitigation: ${error.message}`);
    return result as GeaesipMitigationPlan;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_mitigation_plan')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du plan de mitigation: ${error.message}`);
  }
}
