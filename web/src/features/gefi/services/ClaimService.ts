import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface InsuranceClaim {
  id: string;
  school_id: string;
  claim_number: string;
  policy_id: string;
  claimant_id: string;
  claimant_name: string;
  incident_date: string;
  reported_date: string;
  incident_type: string;
  incident_description: string;
  amount_claimed: number;
  amount_approved?: number;
  amount_paid?: number;
  currency: string;
  status: 'submitted' | 'under_review' | 'additional_info_needed' | 'approved' | 'partially_approved' | 'denied' | 'paid' | 'closed';
  assigned_to?: string;
  review_notes?: string;
  denial_reason?: string;
  documents: string[];
  payments: ClaimPayment[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ClaimPayment {
  payment_date: string;
  amount: number;
  reference: string;
  method: string;
}

export interface CreateInsuranceClaim {
  policy_id: string;
  claimant_id: string;
  claimant_name: string;
  incident_date: string;
  incident_type: string;
  incident_description: string;
  amount_claimed: number;
  currency?: string;
  documents?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateInsuranceClaim {
  status?: string;
  amount_approved?: number;
  assigned_to?: string;
  review_notes?: string;
  denial_reason?: string;
  metadata?: Record<string, unknown>;
}

export class ClaimService {
  private readonly TABLE = 'insurance_claims';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<InsuranceClaim[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<InsuranceClaim | null> {
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

  async create(schoolId: string, claim: CreateInsuranceClaim): Promise<InsuranceClaim> {
    const claimNumber = `CLM-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        claim_number: claimNumber,
        ...claim,
        reported_date: new Date().toISOString(),
        status: 'submitted',
        currency: claim.currency || 'XOF',
        documents: claim.documents || [],
        payments: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, claim: UpdateInsuranceClaim): Promise<InsuranceClaim> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...claim, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string, amountApproved: number, notes?: string): Promise<InsuranceClaim> {
    return this.update(schoolId, id, {
      status: 'approved',
      amount_approved: amountApproved,
      review_notes: notes,
    });
  }

  async deny(schoolId: string, id: string, reason: string): Promise<InsuranceClaim> {
    return this.update(schoolId, id, {
      status: 'denied',
      denial_reason: reason,
    });
  }

  async recordPayment(schoolId: string, id: string, amount: number, reference: string, method: string): Promise<InsuranceClaim> {
    const claim = await this.getById(schoolId, id);
    if (!claim) throw new Error('Claim not found');

    const newPayment: ClaimPayment = {
      payment_date: new Date().toISOString(),
      amount,
      reference,
      method,
    };

    const updatedPayments = [...claim.payments, newPayment];
    const totalPaid = updatedPayments.reduce((sum, p) => sum + p.amount, 0);

    return this.update(schoolId, id, {
      amount_paid: totalPaid,
      payments: updatedPayments,
      status: totalPaid >= (claim.amount_approved || 0) ? 'paid' : 'partially_approved',
    });
  }

  async getByPolicy(schoolId: string, policyId: string): Promise<InsuranceClaim[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('policy_id', policyId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByStatus(schoolId: string, status: string): Promise<InsuranceClaim[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<InsuranceClaim[]> {
    return this.getByStatus(schoolId, 'submitted');
  }

  async getTotalClaimsAmount(schoolId: string, policyId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('amount_claimed')
      .eq('school_id', schoolId)
      .eq('policy_id', policyId)
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).reduce((sum, c) => sum + c.amount_claimed, 0);
  }
}
