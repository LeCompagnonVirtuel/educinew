import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface TrustLevel {
  id: string;
  school_id: string;
  identity_id: string;
  level: 'low' | 'medium' | 'high' | 'very_high';
  score: number;
  source: string;
  valid_until?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateTrustLevelRequest {
  school_id: string;
  identity_id: string;
  level: TrustLevel['level'];
  score: number;
  source: string;
  valid_until?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateTrustLevelRequest {
  level?: TrustLevel['level'];
  score?: number;
  source?: string;
  valid_until?: string | null;
  metadata?: Record<string, unknown>;
}

export class TrustLevelService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<TrustLevel | null> {
    const { data, error } = await this.supabase
      .from('gei2p_trust_levels')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching trust level', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as TrustLevel;
  }

  async listEntities(schoolId: string, filters?: { level?: string; identity_id?: string; limit?: number; offset?: number }): Promise<TrustLevel[]> {
    let query = this.supabase
      .from('gei2p_trust_levels')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.level) query = query.eq('level', filters.level);
    if (filters?.identity_id) query = query.eq('identity_id', filters.identity_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing trust levels', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as TrustLevel[];
  }

  async createEntity(data: CreateTrustLevelRequest): Promise<TrustLevel | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_trust_levels')
      .insert({
        school_id: data.school_id,
        identity_id: data.identity_id,
        level: data.level,
        score: data.score,
        source: data.source,
        valid_until: data.valid_until,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating trust level', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Trust level created', { id: created.id }, 'gei2p');
    return created as TrustLevel;
  }

  async updateEntity(id: string, data: UpdateTrustLevelRequest): Promise<TrustLevel | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_trust_levels')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating trust level', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Trust level updated', { id }, 'gei2p');
    return updated as TrustLevel;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_trust_levels')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting trust level', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Trust level deleted', { id }, 'gei2p');
    return true;
  }
}
