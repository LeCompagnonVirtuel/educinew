// Enterprise Platform Service - FeatureFlag
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FeatureFlag, FeatureFlagCreate } from '@educi/types';
import { EntFeatureFlagNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureFlagServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureFlagService(schoolId: string, id: string): Promise<FeatureFlag> {
    const item = await this.repo.findFeatureFlagServiceById(schoolId, id);
    if (!item) throw new EntFeatureFlagNotFoundError(id);
    return item;
  }
  async listFeatureFlagServices(schoolId: string, filters?: Record<string, unknown>): Promise<FeatureFlag[]> {
    return this.repo.findAllFeatureFlagServices(schoolId, filters);
  }
  async createFeatureFlagService(schoolId: string, data: FeatureFlagCreate): Promise<FeatureFlag> {
    return this.repo.createFeatureFlagService(schoolId, data);
  }
  async updateFeatureFlagService(schoolId: string, id: string, data: Partial<FeatureFlagCreate>): Promise<FeatureFlag> {
    const existing = await this.repo.findFeatureFlagServiceById(schoolId, id);
    if (!existing) throw new EntFeatureFlagNotFoundError(id);
    return this.repo.updateFeatureFlagService(schoolId, id, data);
  }
  async deleteFeatureFlagService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureFlagServiceById(schoolId, id);
    if (!existing) throw new EntFeatureFlagNotFoundError(id);
    return this.repo.deleteFeatureFlagService(schoolId, id);
  }
  async countFeatureFlagServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureFlagServices(schoolId, filters);
  }
}
