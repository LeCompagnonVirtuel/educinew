import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Vendor {
  id: string;
  school_id: string;
  vendor_code: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  category: 'supplies' | 'equipment' | 'services' | 'construction' | 'other';
  tax_id?: string;
  payment_terms?: string;
  bank_details?: Record<string, unknown>;
  rating: number;
  is_active: boolean;
  total_transactions: number;
  total_amount: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateVendor {
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  category: 'supplies' | 'equipment' | 'services' | 'construction' | 'other';
  tax_id?: string;
  payment_terms?: string;
  bank_details?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateVendor {
  name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  category?: string;
  tax_id?: string;
  payment_terms?: string;
  bank_details?: Record<string, unknown>;
  is_active?: boolean;
  rating?: number;
  metadata?: Record<string, unknown>;
}

export class VendorService {
  private readonly TABLE = 'vendors';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Vendor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Vendor | null> {
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

  async create(schoolId: string, vendor: CreateVendor): Promise<Vendor> {
    const vendorCode = `VND-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        vendor_code: vendorCode,
        ...vendor,
        rating: 0,
        is_active: true,
        total_transactions: 0,
        total_amount: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, vendor: UpdateVendor): Promise<Vendor> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...vendor, updated_at: new Date().toISOString() })
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

  async getActive(schoolId: string): Promise<Vendor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getByCategory(schoolId: string, category: string): Promise<Vendor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async search(schoolId: string, query: string): Promise<Vendor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .or(`name.ilike.%${query}%,contact_person.ilike.%${query}%,email.ilike.%${query}%`)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async updateRating(schoolId: string, id: string, rating: number): Promise<Vendor> {
    return this.update(schoolId, id, { rating: Math.max(0, Math.min(5, rating)) });
  }

  async deactivate(schoolId: string, id: string): Promise<Vendor> {
    return this.update(schoolId, id, { is_active: false });
  }

  async activate(schoolId: string, id: string): Promise<Vendor> {
    return this.update(schoolId, id, { is_active: true });
  }

  async getTopVendors(schoolId: string, limit: number): Promise<Vendor[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('total_amount', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}
