// Enterprise Platform Service - FailoverConfig
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FailoverConfig, FailoverConfigCreate } from '@educi/types';
import { EntFailoverConfigNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFailoverConfigService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFailoverConfig(schoolId: string, id: string): Promise<FailoverConfig> {
    const item = await this.repo.findFailoverConfigById(schoolId, id);
    if (!item) throw new EntFailoverConfigNotFoundError(id);
    return item;
  }
  async listFailoverConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<FailoverConfig[]> {
    return this.repo.findAllFailoverConfigs(schoolId, filters);
  }
  async createFailoverConfig(schoolId: string, data: FailoverConfigCreate): Promise<FailoverConfig> {
    return this.repo.createFailoverConfig(schoolId, data);
  }
  async updateFailoverConfig(schoolId: string, id: string, data: Partial<FailoverConfigCreate>): Promise<FailoverConfig> {
    const existing = await this.repo.findFailoverConfigById(schoolId, id);
    if (!existing) throw new EntFailoverConfigNotFoundError(id);
    return this.repo.updateFailoverConfig(schoolId, id, data);
  }
  async deleteFailoverConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFailoverConfigById(schoolId, id);
    if (!existing) throw new EntFailoverConfigNotFoundError(id);
    return this.repo.deleteFailoverConfig(schoolId, id);
  }
  async countFailoverConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFailoverConfigs(schoolId, filters);
  }
}
