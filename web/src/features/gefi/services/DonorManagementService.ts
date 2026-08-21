import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Donor {
  id: string;
  school_id: string;
  donor_code: string;
  name: string;
  type: 'government' | 'ngo' | 'foundation' | 'corporate' | 'individual' | 'multilateral';
  country: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  total_contribution: number;
  currency: string;
  active_grants: number;
  rating: number;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface DonorContribution {
  id: string;
  donor_id: string;
  grant_id: string;
  amount: number;
  currency: string;
  contribution_date: string;
  reference: string;
  notes?: string;
  school_id: string;
  created_at: string;
}

export interface CreateDonor {
  name: string;
  type: 'government' | 'ngo' | 'foundation' | 'corporate' | 'individual' | 'multilateral';
  country: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  currency?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateDonor {
  name?: string;
  type?: string;
  country?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  rating?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class DonorManagementService {
  private readonly TABLE = 'donors';
  private readonly CONTRIBUTIONS_TABLE = 'donor_contributions';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Donor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Donor | null> {
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

  async create(schoolId: string, donor: CreateDonor): Promise<Donor> {
    const donorCode = `DON-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        donor_code: donorCode,
        ...donor,
        currency: donor.currency || 'USD',
        total_contribution: 0,
        active_grants: 0,
        rating: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, donor: UpdateDonor): Promise<Donor> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...donor, updated_at: new Date().toISOString() })
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

  async getByType(schoolId: string, type: string): Promise<Donor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByCountry(schoolId: string, country: string): Promise<Donor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('country', country)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async search(schoolId: string, query: string): Promise<Donor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .or(`name.ilike.%${query}%,contact_person.ilike.%${query}%,email.ilike.%${query}%`)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async recordContribution(schoolId: string, donorId: string, grantId: string, amount: number, currency: string, contributionDate: string, reference: string): Promise<DonorContribution> {
    const { data, error } = await this.supabase
      .from(this.CONTRIBUTIONS_TABLE)
      .insert({
        donor_id: donorId,
        grant_id: grantId,
        amount,
        currency,
        contribution_date: contributionDate,
        reference,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;

    const donor = await this.getById(schoolId, donorId);
    if (donor) {
      await this.update(schoolId, donorId, {
        total_contribution: donor.total_contribution + amount,
      });
    }

    return data;
  }

  async getContributions(schoolId: string, donorId: string): Promise<DonorContribution[]> {
    const { data, error } = await this.supabase
      .from(this.CONTRIBUTIONS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('donor_id', donorId)
      .order('contribution_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getTopDonors(schoolId: string, limit: number): Promise<Donor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('total_contribution', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async updateRating(schoolId: string, id: string, rating: number): Promise<Donor> {
    return this.update(schoolId, id, { rating: Math.max(0, Math.min(5, rating)) });
  }
}
