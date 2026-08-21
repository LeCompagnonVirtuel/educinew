// Enterprise Platform Service - FeatureRequestsComments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureCommentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureRequestsComment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFeatureRequestsCommentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFeatureRequestsComments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFeatureRequestsComments(schoolId, filters);
  }
  async createFeatureRequestsComment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFeatureRequestsComment(schoolId, data);
  }
  async updateFeatureRequestsComment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFeatureRequestsCommentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFeatureRequestsComment(schoolId, id, data);
  }
  async deleteFeatureRequestsComment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureRequestsCommentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFeatureRequestsComment(schoolId, id);
  }
  async countFeatureRequestsComments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureRequestsComments(schoolId, filters);
  }
}
