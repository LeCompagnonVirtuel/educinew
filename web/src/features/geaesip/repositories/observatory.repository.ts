import { supabase } from '@educi/config';
import type {
  GeaesipCompositeIndex,
  GeaesipObservatoryIndicator2,
  GeaesipObservatoryTrend,
} from '@educi/types';

export class GeaesipCompositeIndexRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_composite_index')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des indices composites: ${error.message}`);
    return data as GeaesipCompositeIndex[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_composite_index')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Indice composite ${id} introuvable: ${error.message}`);
    return data as GeaesipCompositeIndex;
  }

  async create(data: Omit<GeaesipCompositeIndex, 'id' | 'computedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), computedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_composite_index')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'indice composite: ${error.message}`);
    return result as GeaesipCompositeIndex;
  }

  async update(id: string, data: Partial<Omit<GeaesipCompositeIndex, 'id' | 'computedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_composite_index')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'indice composite: ${error.message}`);
    return result as GeaesipCompositeIndex;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_composite_index')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'indice composite: ${error.message}`);
  }
}

export class GeaesipObservatoryIndicator2Repository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_observatory_indicator2')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des indicateurs observatoire: ${error.message}`);
    return data as GeaesipObservatoryIndicator2[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_observatory_indicator2')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Indicateur observatoire ${id} introuvable: ${error.message}`);
    return data as GeaesipObservatoryIndicator2;
  }

  async create(data: Omit<GeaesipObservatoryIndicator2, 'id' | 'computedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), computedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_observatory_indicator2')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de l'indicateur observatoire: ${error.message}`);
    return result as GeaesipObservatoryIndicator2;
  }

  async update(id: string, data: Partial<Omit<GeaesipObservatoryIndicator2, 'id' | 'computedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_observatory_indicator2')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de l'indicateur observatoire: ${error.message}`);
    return result as GeaesipObservatoryIndicator2;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_observatory_indicator2')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de l'indicateur observatoire: ${error.message}`);
  }
}

export class GeaesipObservatoryTrendRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_observatory_trend')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des tendances observatoire: ${error.message}`);
    return data as GeaesipObservatoryTrend[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_observatory_trend')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Tendance observatoire ${id} introuvable: ${error.message}`);
    return data as GeaesipObservatoryTrend;
  }

  async create(data: Omit<GeaesipObservatoryTrend, 'id' | 'computedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), computedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_observatory_trend')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la tendance observatoire: ${error.message}`);
    return result as GeaesipObservatoryTrend;
  }

  async update(id: string, data: Partial<Omit<GeaesipObservatoryTrend, 'id' | 'computedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_observatory_trend')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la tendance observatoire: ${error.message}`);
    return result as GeaesipObservatoryTrend;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_observatory_trend')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la tendance observatoire: ${error.message}`);
  }
}
