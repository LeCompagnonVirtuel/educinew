import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Verification {
  id: string;
  school_id: string;
  identity_id: string;
  method: 'document' | 'biometric' | 'knowledge' | 'social' | 'digital' | 'hybrid';
  status: 'pending' | 'in_progress' | 'passed' | 'failed' | 'expired';
  verifier: string;
  evidence?: Record<string, unknown>;
  result?: Record<string, unknown>;
  verified_at?: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateVerificationRequest {
  school_id: string;
  identity_id: string;
  method: Verification['method'];
  status?: Verification['status'];
  verifier: string;
  evidence?: Record<string, unknown>;
  result?: Record<string, unknown>;
  verified_at?: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateVerificationRequest {
  method?: Verification['method'];
  status?: Verification['status'];
  verifier?: string;
  evidence?: Record<string, unknown> | null;
  result?: Record<string, unknown> | null;
  verified_at?: string;
  expires_at?: string | null;
  metadata?: Record<string, unknown>;
}

export class VerificationService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Verification | null> {
    const { data, error } = await this.supabase
      .from('gei2p_verifications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching verification', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Verification;
  }

  async listEntities(schoolId: string, filters?: { status?: string; method?: string; identity_id?: string; limit?: number; offset?: number }): Promise<Verification[]> {
    let query = this.supabase
      .from('gei2p_verifications')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.method) query = query.eq('method', filters.method);
    if (filters?.identity_id) query = query.eq('identity_id', filters.identity_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing verifications', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Verification[];
  }

  async createEntity(data: CreateVerificationRequest): Promise<Verification | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_verifications')
      .insert({
        school_id: data.school_id,
        identity_id: data.identity_id,
        method: data.method,
        status: data.status || 'pending',
        verifier: data.verifier,
        evidence: data.evidence,
        result: data.result,
        verified_at: data.verified_at,
        expires_at: data.expires_at,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating verification', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Verification created', { id: created.id }, 'gei2p');
    return created as Verification;
  }

  async updateEntity(id: string, data: UpdateVerificationRequest): Promise<Verification | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_verifications')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating verification', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Verification updated', { id }, 'gei2p');
    return updated as Verification;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_verifications')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting verification', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Verification deleted', { id }, 'gei2p');
    return true;
  }
}
