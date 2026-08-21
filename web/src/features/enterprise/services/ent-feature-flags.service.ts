// Enterprise Platform Service - FeatureFlags
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureFlagService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureFlag(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFeatureFlagById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFeatureFlags(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFeatureFlags(schoolId, filters);
  }
  async createFeatureFlag(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFeatureFlag(schoolId, data);
  }
  async updateFeatureFlag(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFeatureFlagById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFeatureFlag(schoolId, id, data);
  }
  async deleteFeatureFlag(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureFlagById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFeatureFlag(schoolId, id);
  }
  async countFeatureFlags(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureFlags(schoolId, filters);
  }
}
