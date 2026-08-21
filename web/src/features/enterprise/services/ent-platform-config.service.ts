// Enterprise Platform Service - PlatformConfig
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformConfig, PlatformConfigCreate } from '@educi/types';
import { EntPlatformConfigNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformConfigService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformConfig(schoolId: string, id: string): Promise<PlatformConfig> {
    const item = await this.repo.findPlatformConfigById(schoolId, id);
    if (!item) throw new EntPlatformConfigNotFoundError(id);
    return item;
  }
  async listPlatformConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformConfig[]> {
    return this.repo.findAllPlatformConfigs(schoolId, filters);
  }
  async createPlatformConfig(schoolId: string, data: PlatformConfigCreate): Promise<PlatformConfig> {
    return this.repo.createPlatformConfig(schoolId, data);
  }
  async updatePlatformConfig(schoolId: string, id: string, data: Partial<PlatformConfigCreate>): Promise<PlatformConfig> {
    const existing = await this.repo.findPlatformConfigById(schoolId, id);
    if (!existing) throw new EntPlatformConfigNotFoundError(id);
    return this.repo.updatePlatformConfig(schoolId, id, data);
  }
  async deletePlatformConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformConfigById(schoolId, id);
    if (!existing) throw new EntPlatformConfigNotFoundError(id);
    return this.repo.deletePlatformConfig(schoolId, id);
  }
  async countPlatformConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformConfigs(schoolId, filters);
  }
}
