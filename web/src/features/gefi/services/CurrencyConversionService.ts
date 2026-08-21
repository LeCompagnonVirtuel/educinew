import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface CurrencyConversion {
  id: string;
  school_id: string;
  conversion_number: string;
  from_currency: string;
  to_currency: string;
  amount: number;
  converted_amount: number;
  rate_used: number;
  rate_source: string;
  fee_amount: number;
  net_amount: number;
  status: 'pending' | 'completed' | 'failed';
  transaction_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ConversionRequest {
  from_currency: string;
  to_currency: string;
  amount: number;
  rate_source?: string;
  metadata?: Record<string, unknown>;
}

export interface ConversionResult {
  from_currency: string;
  to_currency: string;
  amount: number;
  converted_amount: number;
  rate: number;
  inverse_rate: number;
  fee_percentage: number;
  fee_amount: number;
  net_amount: number;
}

export class CurrencyConversionService {
  private readonly TABLE = 'currency_conversions';
  private readonly FEE_TABLE = 'conversion_fees';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<CurrencyConversion[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<CurrencyConversion | null> {
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

  async create(schoolId: string, conversion: Omit<CurrencyConversion, 'id' | 'conversion_number' | 'created_at' | 'updated_at' | 'school_id'>): Promise<CurrencyConversion> {
    const conversionNumber = `CC-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...conversion,
        conversion_number: conversionNumber,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, updates: Partial<CurrencyConversion>): Promise<CurrencyConversion> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
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

  async calculateConversion(schoolId: string, request: ConversionRequest): Promise<ConversionResult> {
    const { data: rateData, error: rateError } = await this.supabase
      .from('fx_rates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('base_currency', request.from_currency)
      .eq('quote_currency', request.to_currency)
      .eq('is_active', true)
      .single();

    if (rateError || !rateData) {
      throw new Error(`No exchange rate found for ${request.from_currency}/${request.to_currency}`);
    }

    const rate = rateData.rate;
    const inverseRate = 1 / rate;
    const convertedAmount = request.amount * rate;

    const { data: feeData } = await this.supabase
      .from(this.FEE_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('from_currency', request.from_currency)
      .eq('to_currency', request.to_currency)
      .single();

    const feePercentage = feeData?.fee_percentage || 0;
    const feeAmount = convertedAmount * (feePercentage / 100);
    const netAmount = convertedAmount - feeAmount;

    return {
      from_currency: request.from_currency,
      to_currency: request.to_currency,
      amount: request.amount,
      converted_amount: convertedAmount,
      rate,
      inverse_rate: inverseRate,
      fee_percentage: feePercentage,
      fee_amount: feeAmount,
      net_amount: netAmount,
    };
  }

  async executeConversion(schoolId: string, request: ConversionRequest): Promise<CurrencyConversion> {
    const result = await this.calculateConversion(schoolId, request);

    return this.create(schoolId, {
      from_currency: result.from_currency,
      to_currency: result.to_currency,
      amount: result.amount,
      converted_amount: result.converted_amount,
      rate_used: result.rate,
      rate_source: request.rate_source || 'system',
      fee_amount: result.fee_amount,
      net_amount: result.net_amount,
      status: 'completed',
      metadata: request.metadata,
    });
  }

  async getByStatus(schoolId: string, status: string): Promise<CurrencyConversion[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByCurrencyPair(schoolId: string, fromCurrency: string, toCurrency: string): Promise<CurrencyConversion[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('from_currency', fromCurrency)
      .eq('to_currency', toCurrency)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getTotalConverted(schoolId: string, fromCurrency: string, toCurrency: string): Promise<{ totalAmount: number; totalConverted: number; totalFees: number }> {
    const conversions = await this.getByCurrencyPair(schoolId, fromCurrency, toCurrency);
    return {
      totalAmount: conversions.reduce((sum, c) => sum + c.amount, 0),
      totalConverted: conversions.reduce((sum, c) => sum + c.converted_amount, 0),
      totalFees: conversions.reduce((sum, c) => sum + c.fee_amount, 0),
    };
  }

  async getConversionHistory(schoolId: string, days: number): Promise<CurrencyConversion[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .gte('created_at', cutoffDate.toISOString())
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}
