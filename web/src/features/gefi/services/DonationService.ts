import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Donation {
  id: string;
  school_id: string;
  donation_number: string;
  campaign_id: string;
  donor_name: string;
  donor_email?: string;
  donor_phone?: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_reference?: string;
  is_anonymous: boolean;
  message?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  completed_at?: string;
  tax_receipt_issued: boolean;
  tax_receipt_number?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateDonation {
  campaign_id: string;
  donor_name: string;
  donor_email?: string;
  donor_phone?: string;
  amount: number;
  currency?: string;
  payment_method: string;
  is_anonymous?: boolean;
  message?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateDonation {
  status?: string;
  completed_at?: string;
  tax_receipt_issued?: boolean;
  tax_receipt_number?: string;
  metadata?: Record<string, unknown>;
}

export class DonationService {
  private readonly TABLE = 'donations';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Donation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Donation | null> {
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

  async create(schoolId: string, donation: CreateDonation): Promise<Donation> {
    const donationNumber = `DON-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        donation_number: donationNumber,
        ...donation,
        currency: donation.currency || 'XOF',
        is_anonymous: donation.is_anonymous ?? false,
        status: 'pending',
        tax_receipt_issued: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, donation: UpdateDonation): Promise<Donation> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...donation, updated_at: new Date().toISOString() })
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

  async complete(schoolId: string, id: string, paymentReference: string): Promise<Donation> {
    return this.update(schoolId, id, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      payment_reference: paymentReference,
    });
  }

  async issueTaxReceipt(schoolId: string, id: string, receiptNumber: string): Promise<Donation> {
    return this.update(schoolId, id, {
      tax_receipt_issued: true,
      tax_receipt_number: receiptNumber,
    });
  }

  async getByCampaign(schoolId: string, campaignId: string): Promise<Donation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('campaign_id', campaignId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByDonor(schoolId: string, donorEmail: string): Promise<Donation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('donor_email', donorEmail)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getCompleted(schoolId: string): Promise<Donation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getTotalByCampaign(schoolId: string, campaignId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('amount')
      .eq('school_id', schoolId)
      .eq('campaign_id', campaignId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).reduce((sum, d) => sum + d.amount, 0);
  }

  async getDonorCount(schoolId: string, campaignId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('donor_email')
      .eq('school_id', schoolId)
      .eq('campaign_id', campaignId)
      .eq('status', 'completed')
      .eq('is_anonymous', false)
      .is('deleted_at', null);

    if (error) throw error;
    const uniqueEmails = new Set((data || []).map((d) => d.donor_email).filter(Boolean));
    return uniqueEmails.size;
  }

  async getTopDonors(schoolId: string, campaignId: string, limit: number): Promise<Donation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('campaign_id', campaignId)
      .eq('status', 'completed')
      .eq('is_anonymous', false)
      .is('deleted_at', null)
      .order('amount', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}
