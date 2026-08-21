// Enterprise Platform Service - FeatureFlag
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FeatureFlag, FeatureFlagCreate } from '@educi/types';
import { EntFeatureFlagNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureFlagService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureFlag(schoolId: string, id: string): Promise<FeatureFlag> {
    const item = await this.repo.findFeatureFlagById(schoolId, id);
    if (!item) throw new EntFeatureFlagNotFoundError(id);
    return item;
  }
  async listFeatureFlags(schoolId: string, filters?: Record<string, unknown>): Promise<FeatureFlag[]> {
    return this.repo.findAllFeatureFlags(schoolId, filters);
  }
  async createFeatureFlag(schoolId: string, data: FeatureFlagCreate): Promise<FeatureFlag> {
    return this.repo.createFeatureFlag(schoolId, data);
  }
  async updateFeatureFlag(schoolId: string, id: string, data: Partial<FeatureFlagCreate>): Promise<FeatureFlag> {
    const existing = await this.repo.findFeatureFlagById(schoolId, id);
    if (!existing) throw new EntFeatureFlagNotFoundError(id);
    return this.repo.updateFeatureFlag(schoolId, id, data);
  }
  async deleteFeatureFlag(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureFlagById(schoolId, id);
    if (!existing) throw new EntFeatureFlagNotFoundError(id);
    return this.repo.deleteFeatureFlag(schoolId, id);
  }
  async countFeatureFlags(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureFlags(schoolId, filters);
  }
}
