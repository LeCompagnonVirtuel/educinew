import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface EconomicForecast {
  id: string;
  school_id: string;
  forecast_code: string;
  name: string;
  description: string;
  forecast_type: 'revenue' | 'enrollment' | 'costs' | 'market' | 'composite';
  methodology: 'linear_regression' | 'time_series' | 'monte_carlo' | 'machine_learning' | 'manual';
  period_start: string;
  period_end: string;
  granularity: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  input_data: Record<string, unknown>;
  forecast_data: ForecastDataPoint[];
  confidence_level: number;
  accuracy_score?: number;
  status: 'draft' | 'validated' | 'published' | 'archived';
  validated_by?: string;
  validated_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ForecastDataPoint {
  period: string;
  value: number;
  lower_bound: number;
  upper_bound: number;
  confidence: number;
}

export interface CreateEconomicForecast {
  name: string;
  description: string;
  forecast_type: 'revenue' | 'enrollment' | 'costs' | 'market' | 'composite';
  methodology: 'linear_regression' | 'time_series' | 'monte_carlo' | 'machine_learning' | 'manual';
  period_start: string;
  period_end: string;
  granularity: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  input_data: Record<string, unknown>;
  forecast_data: ForecastDataPoint[];
  confidence_level: number;
  metadata?: Record<string, unknown>;
}

export interface UpdateEconomicForecast {
  name?: string;
  description?: string;
  forecast_data?: ForecastDataPoint[];
  confidence_level?: number;
  accuracy_score?: number;
  status?: string;
  metadata?: Record<string, unknown>;
}

export class EconomicForecastService {
  private readonly TABLE = 'economic_forecasts';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<EconomicForecast[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<EconomicForecast | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, forecast: CreateEconomicForecast): Promise<EconomicForecast> {
    const forecastCode = `ECOF-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        forecast_code: forecastCode,
        ...forecast,
        status: 'draft',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, forecast: UpdateEconomicForecast): Promise<EconomicForecast> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...forecast, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async validate(schoolId: string, id: string, validatedBy: string): Promise<EconomicForecast> {
    return this.update(schoolId, id, {
      status: 'validated',
      validated_by: validatedBy,
      validated_at: new Date().toISOString(),
    });
  }

  async publish(schoolId: string, id: string): Promise<EconomicForecast> {
    return this.update(schoolId, id, { status: 'published' });
  }

  async getByType(schoolId: string, forecastType: string): Promise<EconomicForecast[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('forecast_type', forecastType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getLatest(schoolId: string, forecastType: string): Promise<EconomicForecast | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('forecast_type', forecastType)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  }

  async getPublished(schoolId: string): Promise<EconomicForecast[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'published')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async compareForecasts(schoolId: string, forecastIds: string[]): Promise<{ id: string; name: string; forecast_data: ForecastDataPoint[]; accuracy_score?: number }[]> {
    const results: { id: string; name: string; forecast_data: ForecastDataPoint[]; accuracy_score?: number }[] = [];

    for (const id of forecastIds) {
      const forecast = await this.getById(schoolId, id);
      if (forecast) {
        results.push({
          id: forecast.id,
          name: forecast.name,
          forecast_data: forecast.forecast_data,
          accuracy_score: forecast.accuracy_score,
        });
      }
    }

    return results;
  }

  async getAggregateForecast(schoolId: string, forecastType: string): Promise<{ totalForecasted: number; averageConfidence: number; trend: 'up' | 'down' | 'stable' }> {
    const forecasts = await this.getByType(schoolId, forecastType);
    if (forecasts.length === 0) {
      return { totalForecasted: 0, averageConfidence: 0, trend: 'stable' };
    }

    const latest = forecasts[0];
    const totalForecasted = latest.forecast_data.reduce((sum, d) => sum + d.value, 0);
    const averageConfidence = latest.forecast_data.reduce((sum, d) => sum + d.confidence, 0) / latest.forecast_data.length;

    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (latest.forecast_data.length >= 2) {
      const lastTwo = latest.forecast_data.slice(-2);
      if (lastTwo[1].value > lastTwo[0].value * 1.05) trend = 'up';
      else if (lastTwo[1].value < lastTwo[0].value * 0.95) trend = 'down';
    }

    return { totalForecasted, averageConfidence, trend };
  }
}
