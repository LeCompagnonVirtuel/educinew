// Enterprise Platform Service - FeatureRequests
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureRequestService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureRequest(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFeatureRequestById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFeatureRequests(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFeatureRequests(schoolId, filters);
  }
  async createFeatureRequest(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFeatureRequest(schoolId, data);
  }
  async updateFeatureRequest(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFeatureRequestById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFeatureRequest(schoolId, id, data);
  }
  async deleteFeatureRequest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureRequestById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFeatureRequest(schoolId, id);
  }
  async countFeatureRequests(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureRequests(schoolId, filters);
  }
}
