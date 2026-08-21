// Enterprise Platform Service - EnvironmentConfig
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnvironmentConfig, EnvironmentConfigCreate } from '@educi/types';
import { EntEnvironmentConfigNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEnvironmentConfigServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEnvironmentConfigService(schoolId: string, id: string): Promise<EnvironmentConfig> {
    const item = await this.repo.findEnvironmentConfigServiceById(schoolId, id);
    if (!item) throw new EntEnvironmentConfigNotFoundError(id);
    return item;
  }
  async listEnvironmentConfigServices(schoolId: string, filters?: Record<string, unknown>): Promise<EnvironmentConfig[]> {
    return this.repo.findAllEnvironmentConfigServices(schoolId, filters);
  }
  async createEnvironmentConfigService(schoolId: string, data: EnvironmentConfigCreate): Promise<EnvironmentConfig> {
    return this.repo.createEnvironmentConfigService(schoolId, data);
  }
  async updateEnvironmentConfigService(schoolId: string, id: string, data: Partial<EnvironmentConfigCreate>): Promise<EnvironmentConfig> {
    const existing = await this.repo.findEnvironmentConfigServiceById(schoolId, id);
    if (!existing) throw new EntEnvironmentConfigNotFoundError(id);
    return this.repo.updateEnvironmentConfigService(schoolId, id, data);
  }
  async deleteEnvironmentConfigService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnvironmentConfigServiceById(schoolId, id);
    if (!existing) throw new EntEnvironmentConfigNotFoundError(id);
    return this.repo.deleteEnvironmentConfigService(schoolId, id);
  }
  async countEnvironmentConfigServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEnvironmentConfigServices(schoolId, filters);
  }
}
