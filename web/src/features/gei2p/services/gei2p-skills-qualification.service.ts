import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Qualification {
  id: string;
  school_id: string;
  name: string;
  code: string;
  level: 'certificate' | 'diploma' | 'degree' | 'professional' | 'micro';
  issuing_body: string;
  country: string;
  status: 'active' | 'deprecated' | 'draft';
  description?: string;
  competencies?: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateQualificationRequest {
  school_id: string;
  name: string;
  code: string;
  level: Qualification['level'];
  issuing_body: string;
  country: string;
  status?: Qualification['status'];
  description?: string;
  competencies?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateQualificationRequest {
  name?: string;
  code?: string;
  level?: Qualification['level'];
  issuing_body?: string;
  country?: string;
  status?: Qualification['status'];
  description?: string | null;
  competencies?: string[];
  metadata?: Record<string, unknown>;
}

export class QualificationService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Qualification | null> {
    const { data, error } = await this.supabase
      .from('gei2p_qualifications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching qualification', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Qualification;
  }

  async listEntities(schoolId: string, filters?: { status?: string; level?: string; country?: string; limit?: number; offset?: number }): Promise<Qualification[]> {
    let query = this.supabase
      .from('gei2p_qualifications')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.level) query = query.eq('level', filters.level);
    if (filters?.country) query = query.eq('country', filters.country);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing qualifications', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Qualification[];
  }

  async createEntity(data: CreateQualificationRequest): Promise<Qualification | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_qualifications')
      .insert({
        school_id: data.school_id,
        name: data.name,
        code: data.code,
        level: data.level,
        issuing_body: data.issuing_body,
        country: data.country,
        status: data.status || 'active',
        description: data.description,
        competencies: data.competencies,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating qualification', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Qualification created', { id: created.id }, 'gei2p');
    return created as Qualification;
  }

  async updateEntity(id: string, data: UpdateQualificationRequest): Promise<Qualification | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_qualifications')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating qualification', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Qualification updated', { id }, 'gei2p');
    return updated as Qualification;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_qualifications')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting qualification', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Qualification deleted', { id }, 'gei2p');
    return true;
  }
}
