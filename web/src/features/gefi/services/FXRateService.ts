import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface FXRate {
  id: string;
  school_id: string;
  base_currency: string;
  quote_currency: string;
  rate: number;
  inverse_rate: number;
  source: string;
  effective_date: string;
  is_active: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface FXRateHistory {
  id: string;
  rate_id: string;
  rate: number;
  recorded_at: string;
  school_id: string;
}

export interface CreateFXRate {
  base_currency: string;
  quote_currency: string;
  rate: number;
  source: string;
  effective_date: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateFXRate {
  rate?: number;
  inverse_rate?: number;
  source?: string;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export class FXRateService {
  private readonly TABLE = 'fx_rates';
  private readonly HISTORY_TABLE = 'fx_rate_history';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<FXRate[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('base_currency');

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<FXRate | null> {
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

  async create(schoolId: string, rate: CreateFXRate): Promise<FXRate> {
    const inverseRate = 1 / rate.rate;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...rate,
        inverse_rate: inverseRate,
        is_active: true,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;

    await this.recordHistory(schoolId, data.id, rate.rate);

    return data;
  }

  async update(schoolId: string, id: string, rate: UpdateFXRate): Promise<FXRate> {
    const updates: UpdateFXRate = { ...rate };
    if (rate.rate) {
      updates.inverse_rate = 1 / rate.rate;
    }

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (rate.rate) {
      await this.recordHistory(schoolId, id, rate.rate);
    }

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

  async getActive(schoolId: string): Promise<FXRate[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByCurrencyPair(schoolId: string, baseCurrency: string, quoteCurrency: string): Promise<FXRate | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('base_currency', baseCurrency)
      .eq('quote_currency', quoteCurrency)
      .eq('is_active', true)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async convert(schoolId: string, amount: number, fromCurrency: string, toCurrency: string): Promise<{ amount: number; rate: number; inverseRate: number }> {
    if (fromCurrency === toCurrency) {
      return { amount, rate: 1, inverseRate: 1 };
    }

    const rate = await this.getByCurrencyPair(schoolId, fromCurrency, toCurrency);
    if (rate) {
      return { amount: amount * rate.rate, rate: rate.rate, inverseRate: rate.inverse_rate };
    }

    const inverseRate = await this.getByCurrencyPair(schoolId, toCurrency, fromCurrency);
    if (inverseRate) {
      return { amount: amount * inverseRate.inverse_rate, rate: inverseRate.inverse_rate, inverseRate: inverseRate.rate };
    }

    throw new Error(`No exchange rate found for ${fromCurrency}/${toCurrency}`);
  }

  async recordHistory(schoolId: string, rateId: string, rate: number): Promise<FXRateHistory> {
    const { data, error } = await this.supabase
      .from(this.HISTORY_TABLE)
      .insert({
        rate_id: rateId,
        rate,
        recorded_at: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getHistory(schoolId: string, rateId: string): Promise<FXRateHistory[]> {
    const { data, error } = await this.supabase
      .from(this.HISTORY_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('rate_id', rateId)
      .order('recorded_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getSupportedCurrencies(schoolId: string): Promise<string[]> {
    const rates = await this.getActive(schoolId);
    const currencies = new Set<string>();
    rates.forEach((r) => {
      currencies.add(r.base_currency);
      currencies.add(r.quote_currency);
    });
    return Array.from(currencies).sort();
  }

  async getRateTrend(schoolId: string, baseCurrency: string, quoteCurrency: string, days: number): Promise<{ date: string; rate: number }[]> {
    const rate = await this.getByCurrencyPair(schoolId, baseCurrency, quoteCurrency);
    if (!rate) return [];

    const history = await this.getHistory(schoolId, rate.id);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return history
      .filter((h) => new Date(h.recorded_at) >= cutoffDate)
      .map((h) => ({ date: h.recorded_at, rate: h.rate }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
