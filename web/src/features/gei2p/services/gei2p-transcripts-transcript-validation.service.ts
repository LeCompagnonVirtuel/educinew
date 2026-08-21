import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface TranscriptValidation {
  id: string;
  school_id: string;
  transcript_id: string;
  validator_id: string;
  status: 'pending' | 'in_progress' | 'valid' | 'invalid';
  validation_rules?: Record<string, unknown>;
  result?: Record<string, unknown>;
  validated_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateTranscriptValidationRequest {
  school_id: string;
  transcript_id: string;
  validator_id: string;
  status?: TranscriptValidation['status'];
  validation_rules?: Record<string, unknown>;
  result?: Record<string, unknown>;
  validated_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateTranscriptValidationRequest {
  validator_id?: string;
  status?: TranscriptValidation['status'];
  validation_rules?: Record<string, unknown> | null;
  result?: Record<string, unknown> | null;
  validated_at?: string;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class TranscriptValidationService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<TranscriptValidation | null> {
    const { data, error } = await this.supabase
      .from('gei2p_transcript_validations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching transcript validation', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as TranscriptValidation;
  }

  async listEntities(schoolId: string, filters?: { status?: string; transcript_id?: string; limit?: number; offset?: number }): Promise<TranscriptValidation[]> {
    let query = this.supabase
      .from('gei2p_transcript_validations')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.transcript_id) query = query.eq('transcript_id', filters.transcript_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing transcript validations', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as TranscriptValidation[];
  }

  async createEntity(data: CreateTranscriptValidationRequest): Promise<TranscriptValidation | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_transcript_validations')
      .insert({
        school_id: data.school_id,
        transcript_id: data.transcript_id,
        validator_id: data.validator_id,
        status: data.status || 'pending',
        validation_rules: data.validation_rules,
        result: data.result,
        validated_at: data.validated_at,
        error_message: data.error_message,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating transcript validation', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript validation created', { id: created.id }, 'gei2p');
    return created as TranscriptValidation;
  }

  async updateEntity(id: string, data: UpdateTranscriptValidationRequest): Promise<TranscriptValidation | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_transcript_validations')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating transcript validation', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript validation updated', { id }, 'gei2p');
    return updated as TranscriptValidation;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_transcript_validations')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting transcript validation', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Transcript validation deleted', { id }, 'gei2p');
    return true;
  }
}
