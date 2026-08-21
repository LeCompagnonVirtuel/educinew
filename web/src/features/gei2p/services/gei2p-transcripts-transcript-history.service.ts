import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface TranscriptHistory {
  id: string;
  school_id: string;
  transcript_id: string;
  action: 'created' | 'updated' | 'exchanged' | 'validated' | 'revoked';
  performed_by: string;
  changes?: Record<string, unknown>;
  performed_at: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateTranscriptHistoryRequest {
  school_id: string;
  transcript_id: string;
  action: TranscriptHistory['action'];
  performed_by: string;
  changes?: Record<string, unknown>;
  performed_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateTranscriptHistoryRequest {
  action?: TranscriptHistory['action'];
  changes?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}

export class TranscriptHistoryService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<TranscriptHistory | null> {
    const { data, error } = await this.supabase
      .from('gei2p_transcript_histories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching transcript history', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as TranscriptHistory;
  }

  async listEntities(schoolId: string, filters?: { transcript_id?: string; action?: string; limit?: number; offset?: number }): Promise<TranscriptHistory[]> {
    let query = this.supabase
      .from('gei2p_transcript_histories')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.transcript_id) query = query.eq('transcript_id', filters.transcript_id);
    if (filters?.action) query = query.eq('action', filters.action);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('performed_at', { ascending: false });

    if (error) {
      logger.error('Error listing transcript histories', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as TranscriptHistory[];
  }

  async createEntity(data: CreateTranscriptHistoryRequest): Promise<TranscriptHistory | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_transcript_histories')
      .insert({
        school_id: data.school_id,
        transcript_id: data.transcript_id,
        action: data.action,
        performed_by: data.performed_by,
        changes: data.changes,
        performed_at: data.performed_at || new Date().toISOString(),
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating transcript history', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript history created', { id: created.id }, 'gei2p');
    return created as TranscriptHistory;
  }

  async updateEntity(id: string, data: UpdateTranscriptHistoryRequest): Promise<TranscriptHistory | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_transcript_histories')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating transcript history', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript history updated', { id }, 'gei2p');
    return updated as TranscriptHistory;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_transcript_histories')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting transcript history', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Transcript history deleted', { id }, 'gei2p');
    return true;
  }
}
