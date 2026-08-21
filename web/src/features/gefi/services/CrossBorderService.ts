import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface CrossBorderTransfer {
  id: string;
  school_id: string;
  transfer_number: string;
  sender_school_id: string;
  receiver_school_id?: string;
  receiver_name: string;
  receiver_country: string;
  receiver_bank?: Record<string, unknown>;
  amount: number;
  source_currency: string;
  destination_currency: string;
  exchange_rate: number;
  converted_amount: number;
  fees: CrossBorderFee[];
  total_fees: number;
  net_amount: number;
  status: 'pending' | 'compliance_check' | 'processing' | 'completed' | 'failed' | 'blocked';
  compliance_status?: 'pending' | 'approved' | 'rejected';
  compliance_notes?: string;
  swift_reference?: string;
  purpose: string;
  supporting_documents?: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CrossBorderFee {
  type: 'transfer' | 'conversion' | 'intermediary' | 'compliance' | 'other';
  amount: number;
  currency: string;
  description: string;
}

export interface CreateCrossBorderTransfer {
  receiver_name: string;
  receiver_country: string;
  receiver_bank?: Record<string, unknown>;
  amount: number;
  source_currency: string;
  destination_currency: string;
  purpose: string;
  supporting_documents?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateCrossBorderTransfer {
  status?: string;
  compliance_status?: string;
  compliance_notes?: string;
  swift_reference?: string;
  metadata?: Record<string, unknown>;
}

export class CrossBorderService {
  private readonly TABLE = 'cross_border_transfers';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<CrossBorderTransfer[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<CrossBorderTransfer | null> {
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

  async create(schoolId: string, transfer: CreateCrossBorderTransfer): Promise<CrossBorderTransfer> {
    const transferNumber = `XB-${Date.now()}`;
    const fees = await this.calculateFees(transfer.amount, transfer.source_currency, transfer.destination_currency);
    const totalFees = fees.reduce((sum, f) => sum + f.amount, 0);

    const { data: rateData } = await this.supabase
      .from('fx_rates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('base_currency', transfer.source_currency)
      .eq('quote_currency', transfer.destination_currency)
      .eq('is_active', true)
      .single();

    const exchangeRate = rateData?.rate || 1;
    const convertedAmount = transfer.amount * exchangeRate;
    const netAmount = convertedAmount - totalFees;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        transfer_number: transferNumber,
        sender_school_id: schoolId,
        ...transfer,
        exchange_rate: exchangeRate,
        converted_amount: convertedAmount,
        fees,
        total_fees: totalFees,
        net_amount: netAmount,
        status: 'pending',
        compliance_status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, transfer: UpdateCrossBorderTransfer): Promise<CrossBorderTransfer> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...transfer, updated_at: new Date().toISOString() })
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

  private async calculateFees(amount: number, sourceCurrency: string, destCurrency: string): Promise<CrossBorderFee[]> {
    const fees: CrossBorderFee[] = [];

    fees.push({
      type: 'transfer',
      amount: amount * 0.01,
      currency: sourceCurrency,
      description: 'Transfer fee',
    });

    if (sourceCurrency !== destCurrency) {
      fees.push({
        type: 'conversion',
        amount: amount * 0.005,
        currency: sourceCurrency,
        description: 'Currency conversion fee',
      });
    }

    fees.push({
      type: 'compliance',
      amount: 50,
      currency: sourceCurrency,
      description: 'Compliance check fee',
    });

    return fees;
  }

  async complianceCheck(schoolId: string, id: string, approved: boolean, notes: string): Promise<CrossBorderTransfer> {
    return this.update(schoolId, id, {
      compliance_status: approved ? 'approved' : 'rejected',
      compliance_notes: notes,
      status: approved ? 'processing' : 'blocked',
    });
  }

  async complete(schoolId: string, id: string, swiftReference: string): Promise<CrossBorderTransfer> {
    return this.update(schoolId, id, {
      status: 'completed',
      swift_reference: swiftReference,
    });
  }

  async fail(schoolId: string, id: string, reason: string): Promise<CrossBorderTransfer> {
    return this.update(schoolId, id, {
      status: 'failed',
      compliance_notes: reason,
    });
  }

  async getByStatus(schoolId: string, status: string): Promise<CrossBorderTransfer[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingCompliance(schoolId: string): Promise<CrossBorderTransfer[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('compliance_status', 'pending')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByCountry(schoolId: string, country: string): Promise<CrossBorderTransfer[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('receiver_country', country)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getTotalByCountry(schoolId: string, country: string): Promise<number> {
    const transfers = await this.getByCountry(schoolId, country);
    return transfers
      .filter((t) => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  async getTransferStats(schoolId: string): Promise<{ total: number; completed: number; pending: number; totalAmount: number; totalFees: number }> {
    const transfers = await this.getAll(schoolId);
    return {
      total: transfers.length,
      completed: transfers.filter((t) => t.status === 'completed').length,
      pending: transfers.filter((t) => t.status === 'pending').length,
      totalAmount: transfers.reduce((sum, t) => sum + t.amount, 0),
      totalFees: transfers.reduce((sum, t) => sum + t.total_fees, 0),
    };
  }

  async getSupportedCountries(schoolId: string): Promise<string[]> {
    const transfers = await this.getAll(schoolId);
    const countries = new Set(transfers.map((t) => t.receiver_country));
    return Array.from(countries).sort();
  }
}
