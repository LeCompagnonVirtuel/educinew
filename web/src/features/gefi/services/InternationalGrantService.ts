import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface InternationalGrant {
  id: string;
  school_id: string;
  grant_code: string;
  name: string;
  description: string;
  donor_organization: string;
  donor_country: string;
  grant_type: 'bilateral' | 'multilateral' | 'ngo' | 'foundation' | 'other';
  total_amount: number;
  disbursed_amount: number;
  spent_amount: number;
  currency: string;
  exchange_rate: number;
  local_currency_amount: number;
  status: 'applied' | 'negotiated' | 'signed' | 'active' | 'completed' | 'terminated';
  application_date: string;
  start_date: string;
  end_date: string;
  project_code?: string;
  eligible_expenses: Record<string, unknown>;
  reporting_requirements: Record<string, unknown>;
  conditions: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateInternationalGrant {
  name: string;
  description: string;
  donor_organization: string;
  donor_country: string;
  grant_type: 'bilateral' | 'multilateral' | 'ngo' | 'foundation' | 'other';
  total_amount: number;
  currency: string;
  exchange_rate: number;
  start_date: string;
  end_date: string;
  project_code?: string;
  eligible_expenses: Record<string, unknown>;
  reporting_requirements: Record<string, unknown>;
  conditions: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateInternationalGrant {
  name?: string;
  description?: string;
  total_amount?: number;
  exchange_rate?: number;
  status?: string;
  end_date?: string;
  eligible_expenses?: Record<string, unknown>;
  reporting_requirements?: Record<string, unknown>;
  conditions?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class InternationalGrantService {
  private readonly TABLE = 'international_grants';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<InternationalGrant[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<InternationalGrant | null> {
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

  async create(schoolId: string, grant: CreateInternationalGrant): Promise<InternationalGrant> {
    const grantCode = `IG-${Date.now()}`;
    const localCurrencyAmount = grant.total_amount * grant.exchange_rate;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        grant_code: grantCode,
        ...grant,
        disbursed_amount: 0,
        spent_amount: 0,
        local_currency_amount: localCurrencyAmount,
        status: 'applied',
        application_date: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, grant: UpdateInternationalGrant): Promise<InternationalGrant> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...grant, updated_at: new Date().toISOString() })
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

  async activate(schoolId: string, id: string): Promise<InternationalGrant> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async recordDisbursement(schoolId: string, id: string, amount: number): Promise<InternationalGrant> {
    const grant = await this.getById(schoolId, id);
    if (!grant) throw new Error('Grant not found');

    return this.update(schoolId, id, {
      disbursed_amount: grant.disbursed_amount + amount,
    });
  }

  async recordSpending(schoolId: string, id: string, amount: number): Promise<InternationalGrant> {
    const grant = await this.getById(schoolId, id);
    if (!grant) throw new Error('Grant not found');

    return this.update(schoolId, id, {
      spent_amount: grant.spent_amount + amount,
    });
  }

  async getByDonor(schoolId: string, donorOrganization: string): Promise<InternationalGrant[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('donor_organization', donorOrganization)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<InternationalGrant[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUtilizationRate(schoolId: string, id: string): Promise<number> {
    const grant = await this.getById(schoolId, id);
    if (!grant || grant.disbursed_amount === 0) return 0;
    return (grant.spent_amount / grant.disbursed_amount) * 100;
  }

  async getExchangeRateImpact(schoolId: string, id: string): Promise<{ original: number; current: number; difference: number }> {
    const grant = await this.getById(schoolId, id);
    if (!grant) throw new Error('Grant not found');
    const currentLocalAmount = grant.total_amount * grant.exchange_rate;
    return {
      original: grant.local_currency_amount,
      current: currentLocalAmount,
      difference: currentLocalAmount - grant.local_currency_amount,
    };
  }
}
