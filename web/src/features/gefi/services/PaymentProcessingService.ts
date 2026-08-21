import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface PaymentProcessing {
  id: string;
  school_id: string;
  processing_number: string;
  transaction_id: string;
  connector_id: string;
  status: 'initiated' | 'processing' | 'completed' | 'failed' | 'timeout' | 'refunded';
  request_payload: Record<string, unknown>;
  response_payload?: Record<string, unknown>;
  external_transaction_id?: string;
  error_code?: string;
  error_message?: string;
  initiated_at: string;
  completed_at?: string;
  retry_count: number;
  max_retries: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PaymentWebhook {
  id: string;
  school_id: string;
  processing_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  received_at: string;
  processed: boolean;
  processed_at?: string;
  error?: string;
  created_at: string;
}

export interface CreatePaymentProcessing {
  transaction_id: string;
  connector_id: string;
  request_payload: Record<string, unknown>;
  max_retries?: number;
  metadata?: Record<string, unknown>;
}

export class PaymentProcessingService {
  private readonly TABLE = 'payment_processings';
  private readonly WEBHOOKS_TABLE = 'payment_webhooks';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<PaymentProcessing[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<PaymentProcessing | null> {
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

  async create(schoolId: string, processing: CreatePaymentProcessing): Promise<PaymentProcessing> {
    const processingNumber = `PAY-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        processing_number: processingNumber,
        ...processing,
        status: 'initiated',
        initiated_at: new Date().toISOString(),
        retry_count: 0,
        max_retries: processing.max_retries ?? 3,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, updates: Partial<PaymentProcessing>): Promise<PaymentProcessing> {
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

  async complete(schoolId: string, id: string, responsePayload: Record<string, unknown>, externalTransactionId: string): Promise<PaymentProcessing> {
    return this.update(schoolId, id, {
      status: 'completed',
      response_payload: responsePayload,
      external_transaction_id: externalTransactionId,
      completed_at: new Date().toISOString(),
    });
  }

  async fail(schoolId: string, id: string, errorCode: string, errorMessage: string): Promise<PaymentProcessing> {
    const processing = await this.getById(schoolId, id);
    if (!processing) throw new Error('Processing record not found');

    if (processing.retry_count < processing.max_retries) {
      return this.update(schoolId, id, {
        status: 'initiated',
        retry_count: processing.retry_count + 1,
        error_code: errorCode,
        error_message: errorMessage,
      });
    }

    return this.update(schoolId, id, {
      status: 'failed',
      error_code: errorCode,
      error_message: errorMessage,
    });
  }

  async getByStatus(schoolId: string, status: string): Promise<PaymentProcessing[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<PaymentProcessing[]> {
    return this.getByStatus(schoolId, 'processing');
  }

  async recordWebhook(schoolId: string, processingId: string, eventType: string, payload: Record<string, unknown>): Promise<PaymentWebhook> {
    const { data, error } = await this.supabase
      .from(this.WEBHOOKS_TABLE)
      .insert({
        processing_id: processingId,
        event_type: eventType,
        payload,
        received_at: new Date().toISOString(),
        processed: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async processWebhook(schoolId: string, webhookId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.WEBHOOKS_TABLE)
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', webhookId);

    if (error) throw error;
  }
}
