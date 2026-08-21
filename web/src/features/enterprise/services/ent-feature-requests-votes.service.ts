// Enterprise Platform Service - FeatureRequestsVotes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureVoteService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureRequestsVote(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFeatureRequestsVoteById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFeatureRequestsVotes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFeatureRequestsVotes(schoolId, filters);
  }
  async createFeatureRequestsVote(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFeatureRequestsVote(schoolId, data);
  }
  async updateFeatureRequestsVote(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFeatureRequestsVoteById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFeatureRequestsVote(schoolId, id, data);
  }
  async deleteFeatureRequestsVote(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureRequestsVoteById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFeatureRequestsVote(schoolId, id);
  }
  async countFeatureRequestsVotes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureRequestsVotes(schoolId, filters);
  }
}
