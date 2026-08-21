import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface InsurancePolicy {
  id: string;
  school_id: string;
  policy_number: string;
  product_id: string;
  insured_entity_type: 'student' | 'staff' | 'institution' | 'vehicle' | 'property';
  insured_entity_id: string;
  insured_entity_name: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled' | 'suspended';
  premium_amount: number;
  premium_paid: number;
  coverage_amount: number;
  deductible: number;
  currency: string;
  payment_status: 'current' | 'overdue' | 'lapsed';
  next_payment_date?: string;
  beneficiaries?: Record<string, unknown>[];
  documents?: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateInsurancePolicy {
  product_id: string;
  insured_entity_type: 'student' | 'staff' | 'institution' | 'vehicle' | 'property';
  insured_entity_id: string;
  insured_entity_name: string;
  start_date: string;
  end_date: string;
  premium_amount: number;
  coverage_amount: number;
  deductible: number;
  currency?: string;
  beneficiaries?: Record<string, unknown>[];
  documents?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateInsurancePolicy {
  end_date?: string;
  status?: string;
  premium_paid?: number;
  payment_status?: string;
  next_payment_date?: string;
  beneficiaries?: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export class PolicyService {
  private readonly TABLE = 'insurance_policies';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<InsurancePolicy[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<InsurancePolicy | null> {
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

  async create(schoolId: string, policy: CreateInsurancePolicy): Promise<InsurancePolicy> {
    const policyNumber = `POL-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        policy_number: policyNumber,
        ...policy,
        premium_paid: 0,
        currency: policy.currency || 'XOF',
        status: 'active',
        payment_status: 'current',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, policy: UpdateInsurancePolicy): Promise<InsurancePolicy> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...policy, updated_at: new Date().toISOString() })
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

  async cancel(schoolId: string, id: string): Promise<InsurancePolicy> {
    return this.update(schoolId, id, { status: 'cancelled' });
  }

  async suspend(schoolId: string, id: string): Promise<InsurancePolicy> {
    return this.update(schoolId, id, { status: 'suspended' });
  }

  async renew(schoolId: string, id: string, newEndDate: string): Promise<InsurancePolicy> {
    return this.update(schoolId, id, {
      end_date: newEndDate,
      status: 'active',
    });
  }

  async recordPayment(schoolId: string, id: string, amount: number): Promise<InsurancePolicy> {
    const policy = await this.getById(schoolId, id);
    if (!policy) throw new Error('Policy not found');

    const newPaid = policy.premium_paid + amount;
    const newPaymentStatus = newPaid >= policy.premium_amount ? 'current' : 'overdue';

    return this.update(schoolId, id, {
      premium_paid: newPaid,
      payment_status: newPaymentStatus,
    });
  }

  async getActive(schoolId: string): Promise<InsurancePolicy[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getExpiringSoon(schoolId: string, days: number): Promise<InsurancePolicy[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .lte('end_date', futureDate.toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByInsuredEntity(schoolId: string, entityType: string, entityId: string): Promise<InsurancePolicy[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('insured_entity_type', entityType)
      .eq('insured_entity_id', entityId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOverduePolicies(schoolId: string): Promise<InsurancePolicy[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('payment_status', 'overdue')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getTotalCoverage(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('coverage_amount')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).reduce((sum, p) => sum + p.coverage_amount, 0);
  }
}
