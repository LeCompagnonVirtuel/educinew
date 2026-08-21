import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface TranscriptExchange {
  id: string;
  school_id: string;
  student_id: string;
  target_institution: string;
  format: 'pdf' | 'xml' | 'json' | 'csv' | 'custom';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  requested_at: string;
  completed_at?: string;
  error_message?: string;
  exchange_data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateTranscriptExchangeRequest {
  school_id: string;
  student_id: string;
  target_institution: string;
  format: TranscriptExchange['format'];
  status?: TranscriptExchange['status'];
  requested_at?: string;
  completed_at?: string;
  error_message?: string;
  exchange_data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateTranscriptExchangeRequest {
  target_institution?: string;
  format?: TranscriptExchange['format'];
  status?: TranscriptExchange['status'];
  completed_at?: string;
  error_message?: string | null;
  exchange_data?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}

export class TranscriptExchangeService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<TranscriptExchange | null> {
    const { data, error } = await this.supabase
      .from('gei2p_transcript_exchanges')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching transcript exchange', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as TranscriptExchange;
  }

  async listEntities(schoolId: string, filters?: { status?: string; student_id?: string; format?: string; limit?: number; offset?: number }): Promise<TranscriptExchange[]> {
    let query = this.supabase
      .from('gei2p_transcript_exchanges')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.student_id) query = query.eq('student_id', filters.student_id);
    if (filters?.format) query = query.eq('format', filters.format);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing transcript exchanges', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as TranscriptExchange[];
  }

  async createEntity(data: CreateTranscriptExchangeRequest): Promise<TranscriptExchange | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_transcript_exchanges')
      .insert({
        school_id: data.school_id,
        student_id: data.student_id,
        target_institution: data.target_institution,
        format: data.format,
        status: data.status || 'pending',
        requested_at: data.requested_at || new Date().toISOString(),
        completed_at: data.completed_at,
        error_message: data.error_message,
        exchange_data: data.exchange_data,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating transcript exchange', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript exchange created', { id: created.id }, 'gei2p');
    return created as TranscriptExchange;
  }

  async updateEntity(id: string, data: UpdateTranscriptExchangeRequest): Promise<TranscriptExchange | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_transcript_exchanges')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating transcript exchange', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript exchange updated', { id }, 'gei2p');
    return updated as TranscriptExchange;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_transcript_exchanges')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting transcript exchange', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Transcript exchange deleted', { id }, 'gei2p');
    return true;
  }
}
