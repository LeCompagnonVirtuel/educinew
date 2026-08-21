// Enterprise Platform Service - EnvironmentConfig
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnvironmentConfig, EnvironmentConfigCreate } from '@educi/types';
import { EntEnvironmentConfigNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEnvironmentConfigService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEnvironmentConfig(schoolId: string, id: string): Promise<EnvironmentConfig> {
    const item = await this.repo.findEnvironmentConfigById(schoolId, id);
    if (!item) throw new EntEnvironmentConfigNotFoundError(id);
    return item;
  }
  async listEnvironmentConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<EnvironmentConfig[]> {
    return this.repo.findAllEnvironmentConfigs(schoolId, filters);
  }
  async createEnvironmentConfig(schoolId: string, data: EnvironmentConfigCreate): Promise<EnvironmentConfig> {
    return this.repo.createEnvironmentConfig(schoolId, data);
  }
  async updateEnvironmentConfig(schoolId: string, id: string, data: Partial<EnvironmentConfigCreate>): Promise<EnvironmentConfig> {
    const existing = await this.repo.findEnvironmentConfigById(schoolId, id);
    if (!existing) throw new EntEnvironmentConfigNotFoundError(id);
    return this.repo.updateEnvironmentConfig(schoolId, id, data);
  }
  async deleteEnvironmentConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnvironmentConfigById(schoolId, id);
    if (!existing) throw new EntEnvironmentConfigNotFoundError(id);
    return this.repo.deleteEnvironmentConfig(schoolId, id);
  }
  async countEnvironmentConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEnvironmentConfigs(schoolId, filters);
  }
}
