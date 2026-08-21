import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface TranscriptShare {
  id: string;
  school_id: string;
  transcript_id: string;
  shared_by: string;
  shared_with: string;
  permissions: 'view' | 'download' | 'print' | 'full';
  status: 'active' | 'expired' | 'revoked';
  expires_at?: string;
  access_count: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateTranscriptShareRequest {
  school_id: string;
  transcript_id: string;
  shared_by: string;
  shared_with: string;
  permissions: TranscriptShare['permissions'];
  status?: TranscriptShare['status'];
  expires_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateTranscriptShareRequest {
  permissions?: TranscriptShare['permissions'];
  status?: TranscriptShare['status'];
  expires_at?: string | null;
  metadata?: Record<string, unknown>;
}

export class TranscriptShareService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<TranscriptShare | null> {
    const { data, error } = await this.supabase
      .from('gei2p_transcript_shares')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching transcript share', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as TranscriptShare;
  }

  async listEntities(schoolId: string, filters?: { status?: string; transcript_id?: string; shared_with?: string; limit?: number; offset?: number }): Promise<TranscriptShare[]> {
    let query = this.supabase
      .from('gei2p_transcript_shares')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.transcript_id) query = query.eq('transcript_id', filters.transcript_id);
    if (filters?.shared_with) query = query.eq('shared_with', filters.shared_with);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing transcript shares', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as TranscriptShare[];
  }

  async createEntity(data: CreateTranscriptShareRequest): Promise<TranscriptShare | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_transcript_shares')
      .insert({
        school_id: data.school_id,
        transcript_id: data.transcript_id,
        shared_by: data.shared_by,
        shared_with: data.shared_with,
        permissions: data.permissions,
        status: data.status || 'active',
        expires_at: data.expires_at,
        access_count: 0,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating transcript share', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript share created', { id: created.id }, 'gei2p');
    return created as TranscriptShare;
  }

  async updateEntity(id: string, data: UpdateTranscriptShareRequest): Promise<TranscriptShare | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_transcript_shares')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating transcript share', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript share updated', { id }, 'gei2p');
    return updated as TranscriptShare;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_transcript_shares')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting transcript share', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Transcript share deleted', { id }, 'gei2p');
    return true;
  }
}
