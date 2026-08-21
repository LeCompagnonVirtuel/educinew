import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface PaymentConnector {
  id: string;
  school_id: string;
  provider_id: string;
  connector_type: 'money_fusion' | 'wave' | 'orange_money' | 'mtn_momo' | 'moov_money' | 'bank_api' | 'custom';
  status: 'active' | 'inactive' | 'error';
  api_endpoint?: string;
  api_key_encrypted?: string;
  webhook_url?: string;
  last_health_check?: string;
  health_status: 'healthy' | 'degraded' | 'down';
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreatePaymentConnector {
  provider_id: string;
  connector_type: 'money_fusion' | 'wave' | 'orange_money' | 'mtn_momo' | 'moov_money' | 'bank_api' | 'custom';
  api_endpoint?: string;
  api_key_encrypted?: string;
  webhook_url?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdatePaymentConnector {
  status?: 'active' | 'inactive' | 'error';
  api_endpoint?: string;
  api_key_encrypted?: string;
  webhook_url?: string;
  health_status?: 'healthy' | 'degraded' | 'down';
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export class PaymentConnectorService {
  private readonly TABLE = 'payment_connectors';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<PaymentConnector[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at');

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<PaymentConnector | null> {
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

  async create(schoolId: string, connector: CreatePaymentConnector): Promise<PaymentConnector> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...connector, status: 'inactive', health_status: 'healthy', school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, connector: UpdatePaymentConnector): Promise<PaymentConnector> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...connector, updated_at: new Date().toISOString() })
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

  async activate(schoolId: string, id: string): Promise<PaymentConnector> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async deactivate(schoolId: string, id: string): Promise<PaymentConnector> {
    return this.update(schoolId, id, { status: 'inactive' });
  }

  async updateHealthStatus(schoolId: string, id: string, healthStatus: 'healthy' | 'degraded' | 'down', errorMessage?: string): Promise<PaymentConnector> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({
        health_status: healthStatus,
        error_message: errorMessage,
        last_health_check: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getActiveConnectors(schoolId: string): Promise<PaymentConnector[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByProvider(schoolId: string, providerId: string): Promise<PaymentConnector[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('provider_id', providerId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }
}
