// Enterprise Platform Service - FeatureFlagsTargeting
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureFlagTargetingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureFlagsTargeting(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFeatureFlagsTargetingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFeatureFlagsTargeting(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFeatureFlagsTargeting(schoolId, filters);
  }
  async createFeatureFlagsTargeting(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFeatureFlagsTargeting(schoolId, data);
  }
  async updateFeatureFlagsTargeting(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFeatureFlagsTargetingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFeatureFlagsTargeting(schoolId, id, data);
  }
  async deleteFeatureFlagsTargeting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureFlagsTargetingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFeatureFlagsTargeting(schoolId, id);
  }
  async countFeatureFlagsTargeting(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureFlagsTargeting(schoolId, filters);
  }
}
