import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface TranscriptFormat {
  id: string;
  school_id: string;
  name: string;
  format_type: 'pdf' | 'xml' | 'json' | 'csv' | 'custom';
  schema_definition: Record<string, unknown>;
  version: string;
  status: 'active' | 'deprecated' | 'draft';
  description?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateTranscriptFormatRequest {
  school_id: string;
  name: string;
  format_type: TranscriptFormat['format_type'];
  schema_definition: Record<string, unknown>;
  version: string;
  status?: TranscriptFormat['status'];
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateTranscriptFormatRequest {
  name?: string;
  format_type?: TranscriptFormat['format_type'];
  schema_definition?: Record<string, unknown>;
  version?: string;
  status?: TranscriptFormat['status'];
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export class TranscriptFormatService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<TranscriptFormat | null> {
    const { data, error } = await this.supabase
      .from('gei2p_transcript_formats')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching transcript format', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as TranscriptFormat;
  }

  async listEntities(schoolId: string, filters?: { status?: string; format_type?: string; limit?: number; offset?: number }): Promise<TranscriptFormat[]> {
    let query = this.supabase
      .from('gei2p_transcript_formats')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.format_type) query = query.eq('format_type', filters.format_type);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing transcript formats', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as TranscriptFormat[];
  }

  async createEntity(data: CreateTranscriptFormatRequest): Promise<TranscriptFormat | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_transcript_formats')
      .insert({
        school_id: data.school_id,
        name: data.name,
        format_type: data.format_type,
        schema_definition: data.schema_definition,
        version: data.version,
        status: data.status || 'active',
        description: data.description,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating transcript format', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript format created', { id: created.id }, 'gei2p');
    return created as TranscriptFormat;
  }

  async updateEntity(id: string, data: UpdateTranscriptFormatRequest): Promise<TranscriptFormat | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_transcript_formats')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating transcript format', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Transcript format updated', { id }, 'gei2p');
    return updated as TranscriptFormat;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_transcript_formats')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting transcript format', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Transcript format deleted', { id }, 'gei2p');
    return true;
  }
}
