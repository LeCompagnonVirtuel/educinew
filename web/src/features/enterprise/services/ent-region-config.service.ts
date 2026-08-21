// Enterprise Platform Service - RegionConfig
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionConfig, RegionConfigCreate } from '@educi/types';
import { EntRegionConfigNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRegionConfigService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRegionConfig(schoolId: string, id: string): Promise<RegionConfig> {
    const item = await this.repo.findRegionConfigById(schoolId, id);
    if (!item) throw new EntRegionConfigNotFoundError(id);
    return item;
  }
  async listRegionConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<RegionConfig[]> {
    return this.repo.findAllRegionConfigs(schoolId, filters);
  }
  async createRegionConfig(schoolId: string, data: RegionConfigCreate): Promise<RegionConfig> {
    return this.repo.createRegionConfig(schoolId, data);
  }
  async updateRegionConfig(schoolId: string, id: string, data: Partial<RegionConfigCreate>): Promise<RegionConfig> {
    const existing = await this.repo.findRegionConfigById(schoolId, id);
    if (!existing) throw new EntRegionConfigNotFoundError(id);
    return this.repo.updateRegionConfig(schoolId, id, data);
  }
  async deleteRegionConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionConfigById(schoolId, id);
    if (!existing) throw new EntRegionConfigNotFoundError(id);
    return this.repo.deleteRegionConfig(schoolId, id);
  }
  async countRegionConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRegionConfigs(schoolId, filters);
  }
}
