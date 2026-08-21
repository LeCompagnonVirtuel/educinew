import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface CompetencyExchange {
  id: string;
  school_id: string;
  competency_id: string;
  source_system: string;
  target_system: string;
  mapping: Record<string, unknown>;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  exchanged_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateCompetencyExchangeRequest {
  school_id: string;
  competency_id: string;
  source_system: string;
  target_system: string;
  mapping: Record<string, unknown>;
  status?: CompetencyExchange['status'];
  exchanged_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateCompetencyExchangeRequest {
  source_system?: string;
  target_system?: string;
  mapping?: Record<string, unknown>;
  status?: CompetencyExchange['status'];
  exchanged_at?: string;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class CompetencyExchangeService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<CompetencyExchange | null> {
    const { data, error } = await this.supabase
      .from('gei2p_competency_exchanges')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching competency exchange', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as CompetencyExchange;
  }

  async listEntities(schoolId: string, filters?: { status?: string; competency_id?: string; target_system?: string; limit?: number; offset?: number }): Promise<CompetencyExchange[]> {
    let query = this.supabase
      .from('gei2p_competency_exchanges')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.competency_id) query = query.eq('competency_id', filters.competency_id);
    if (filters?.target_system) query = query.eq('target_system', filters.target_system);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing competency exchanges', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as CompetencyExchange[];
  }

  async createEntity(data: CreateCompetencyExchangeRequest): Promise<CompetencyExchange | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_competency_exchanges')
      .insert({
        school_id: data.school_id,
        competency_id: data.competency_id,
        source_system: data.source_system,
        target_system: data.target_system,
        mapping: data.mapping,
        status: data.status || 'pending',
        exchanged_at: data.exchanged_at,
        error_message: data.error_message,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating competency exchange', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Competency exchange created', { id: created.id }, 'gei2p');
    return created as CompetencyExchange;
  }

  async updateEntity(id: string, data: UpdateCompetencyExchangeRequest): Promise<CompetencyExchange | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_competency_exchanges')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating competency exchange', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Competency exchange updated', { id }, 'gei2p');
    return updated as CompetencyExchange;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_competency_exchanges')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting competency exchange', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Competency exchange deleted', { id }, 'gei2p');
    return true;
  }
}
