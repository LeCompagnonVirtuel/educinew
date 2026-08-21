import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ProcurementRequest {
  id: string;
  school_id: string;
  request_number: string;
  title: string;
  description: string;
  category: 'supplies' | 'equipment' | 'services' | 'construction' | 'other';
  requested_by: string;
  department?: string;
  items: ProcurementItem[];
  total_estimated_amount: number;
  currency: string;
  status: 'draft' | 'submitted' | 'approved' | 'quoted' | 'ordered' | 'received' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  needed_by_date: string;
  approved_by?: string;
  approved_at?: string;
  vendor_id?: string;
  purchase_order_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ProcurementItem {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  estimated_unit_price: number;
  total_price: number;
  specifications?: Record<string, unknown>;
}

export interface ProcurementQuote {
  id: string;
  request_id: string;
  vendor_id: string;
  quote_number: string;
  items: ProcurementItem[];
  total_amount: number;
  currency: string;
  valid_until: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  notes?: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProcurementRequest {
  title: string;
  description: string;
  category: 'supplies' | 'equipment' | 'services' | 'construction' | 'other';
  requested_by: string;
  department?: string;
  items: ProcurementItem[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  needed_by_date: string;
  currency?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateProcurementRequest {
  title?: string;
  description?: string;
  status?: string;
  vendor_id?: string;
  purchase_order_id?: string;
  metadata?: Record<string, unknown>;
}

export class ProcurementService {
  private readonly TABLE = 'procurement_requests';
  private readonly QUOTES_TABLE = 'procurement_quotes';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ProcurementRequest[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ProcurementRequest | null> {
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

  async create(schoolId: string, request: CreateProcurementRequest): Promise<ProcurementRequest> {
    const requestNumber = `PR-${Date.now()}`;
    const totalEstimated = request.items.reduce((sum, item) => sum + item.total_price, 0);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        request_number: requestNumber,
        ...request,
        total_estimated_amount: totalEstimated,
        currency: request.currency || 'XOF',
        status: 'draft',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, request: UpdateProcurementRequest): Promise<ProcurementRequest> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...request, updated_at: new Date().toISOString() })
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

  async submit(schoolId: string, id: string): Promise<ProcurementRequest> {
    return this.update(schoolId, id, { status: 'submitted' });
  }

  async approve(schoolId: string, id: string, approvedBy: string): Promise<ProcurementRequest> {
    return this.update(schoolId, id, {
      status: 'approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
    });
  }

  async getByStatus(schoolId: string, status: string): Promise<ProcurementRequest[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<ProcurementRequest[]> {
    return this.getByStatus(schoolId, 'submitted');
  }

  async getQuotes(schoolId: string, requestId: string): Promise<ProcurementQuote[]> {
    const { data, error } = await this.supabase
      .from(this.QUOTES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('request_id', requestId)
      .order('total_amount', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async acceptQuote(schoolId: string, quoteId: string): Promise<ProcurementQuote> {
    const { data, error } = await this.supabase
      .from(this.QUOTES_TABLE)
      .update({ status: 'accepted', updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', quoteId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
