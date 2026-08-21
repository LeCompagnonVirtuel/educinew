// Enterprise Platform Service - PlatformConfig
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformConfig, PlatformConfigCreate } from '@educi/types';
import { EntPlatformConfigNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformConfigServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformConfigService(schoolId: string, id: string): Promise<PlatformConfig> {
    const item = await this.repo.findPlatformConfigServiceById(schoolId, id);
    if (!item) throw new EntPlatformConfigNotFoundError(id);
    return item;
  }
  async listPlatformConfigServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformConfig[]> {
    return this.repo.findAllPlatformConfigServices(schoolId, filters);
  }
  async createPlatformConfigService(schoolId: string, data: PlatformConfigCreate): Promise<PlatformConfig> {
    return this.repo.createPlatformConfigService(schoolId, data);
  }
  async updatePlatformConfigService(schoolId: string, id: string, data: Partial<PlatformConfigCreate>): Promise<PlatformConfig> {
    const existing = await this.repo.findPlatformConfigServiceById(schoolId, id);
    if (!existing) throw new EntPlatformConfigNotFoundError(id);
    return this.repo.updatePlatformConfigService(schoolId, id, data);
  }
  async deletePlatformConfigService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformConfigServiceById(schoolId, id);
    if (!existing) throw new EntPlatformConfigNotFoundError(id);
    return this.repo.deletePlatformConfigService(schoolId, id);
  }
  async countPlatformConfigServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformConfigServices(schoolId, filters);
  }
}
