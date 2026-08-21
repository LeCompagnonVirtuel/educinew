// Enterprise Platform Service - GlobalSearchConfig
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { GlobalSearchConfig, GlobalSearchConfigCreate } from '@educi/types';
import { EntGlobalSearchConfigNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGlobalSearchConfigService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getGlobalSearchConfig(schoolId: string, id: string): Promise<GlobalSearchConfig> {
    const item = await this.repo.findGlobalSearchConfigById(schoolId, id);
    if (!item) throw new EntGlobalSearchConfigNotFoundError(id);
    return item;
  }
  async listGlobalSearchConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<GlobalSearchConfig[]> {
    return this.repo.findAllGlobalSearchConfigs(schoolId, filters);
  }
  async createGlobalSearchConfig(schoolId: string, data: GlobalSearchConfigCreate): Promise<GlobalSearchConfig> {
    return this.repo.createGlobalSearchConfig(schoolId, data);
  }
  async updateGlobalSearchConfig(schoolId: string, id: string, data: Partial<GlobalSearchConfigCreate>): Promise<GlobalSearchConfig> {
    const existing = await this.repo.findGlobalSearchConfigById(schoolId, id);
    if (!existing) throw new EntGlobalSearchConfigNotFoundError(id);
    return this.repo.updateGlobalSearchConfig(schoolId, id, data);
  }
  async deleteGlobalSearchConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGlobalSearchConfigById(schoolId, id);
    if (!existing) throw new EntGlobalSearchConfigNotFoundError(id);
    return this.repo.deleteGlobalSearchConfig(schoolId, id);
  }
  async countGlobalSearchConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGlobalSearchConfigs(schoolId, filters);
  }
}
