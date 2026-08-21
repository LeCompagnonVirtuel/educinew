import { supabase } from '@educi/config';
import type {
  GeaesipExtendedForecast,
  GeaesipForecastBacktest,
  GeaesipModelDrift,
} from '@educi/types';

export class GeaesipExtendedForecastRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_extended_forecast')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des previsions etendues: ${error.message}`);
    return data as GeaesipExtendedForecast[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_extended_forecast')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Prevision etendue ${id} introuvable: ${error.message}`);
    return data as GeaesipExtendedForecast;
  }

  async create(data: Omit<GeaesipExtendedForecast, 'id' | 'createdAt' | 'completedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, completedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_extended_forecast')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la prevision etendue: ${error.message}`);
    return result as GeaesipExtendedForecast;
  }

  async update(id: string, data: Partial<Omit<GeaesipExtendedForecast, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_extended_forecast')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la prevision etendue: ${error.message}`);
    return result as GeaesipExtendedForecast;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_extended_forecast')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la prevision etendue: ${error.message}`);
  }
}

export class GeaesipForecastBacktestRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_forecast_backtest')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des backtests: ${error.message}`);
    return data as GeaesipForecastBacktest[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_forecast_backtest')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Backtest ${id} introuvable: ${error.message}`);
    return data as GeaesipForecastBacktest;
  }

  async create(data: Omit<GeaesipForecastBacktest, 'id' | 'evaluatedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), evaluatedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_forecast_backtest')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du backtest: ${error.message}`);
    return result as GeaesipForecastBacktest;
  }

  async update(id: string, data: Partial<Omit<GeaesipForecastBacktest, 'id' | 'evaluatedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_forecast_backtest')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du backtest: ${error.message}`);
    return result as GeaesipForecastBacktest;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_forecast_backtest')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du backtest: ${error.message}`);
  }
}

export class GeaesipModelDriftRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_model_drift')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des derivations: ${error.message}`);
    return data as GeaesipModelDrift[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_model_drift')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Derivation ${id} introuvable: ${error.message}`);
    return data as GeaesipModelDrift;
  }

  async create(data: Omit<GeaesipModelDrift, 'id' | 'detectedAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), detectedAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_model_drift')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la derivation: ${error.message}`);
    return result as GeaesipModelDrift;
  }

  async update(id: string, data: Partial<Omit<GeaesipModelDrift, 'id' | 'detectedAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_model_drift')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la derivation: ${error.message}`);
    return result as GeaesipModelDrift;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_model_drift')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la derivation: ${error.message}`);
  }
}
