// Enterprise Platform Service - TenantBackupConfig
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantBackupConfig, TenantBackupConfigCreate } from '@educi/types';
import { EntTenantBackupConfigNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantBackupConfigService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantBackupConfig(schoolId: string, id: string): Promise<TenantBackupConfig> {
    const item = await this.repo.findTenantBackupConfigById(schoolId, id);
    if (!item) throw new EntTenantBackupConfigNotFoundError(id);
    return item;
  }
  async listTenantBackupConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<TenantBackupConfig[]> {
    return this.repo.findAllTenantBackupConfigs(schoolId, filters);
  }
  async createTenantBackupConfig(schoolId: string, data: TenantBackupConfigCreate): Promise<TenantBackupConfig> {
    return this.repo.createTenantBackupConfig(schoolId, data);
  }
  async updateTenantBackupConfig(schoolId: string, id: string, data: Partial<TenantBackupConfigCreate>): Promise<TenantBackupConfig> {
    const existing = await this.repo.findTenantBackupConfigById(schoolId, id);
    if (!existing) throw new EntTenantBackupConfigNotFoundError(id);
    return this.repo.updateTenantBackupConfig(schoolId, id, data);
  }
  async deleteTenantBackupConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantBackupConfigById(schoolId, id);
    if (!existing) throw new EntTenantBackupConfigNotFoundError(id);
    return this.repo.deleteTenantBackupConfig(schoolId, id);
  }
  async countTenantBackupConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantBackupConfigs(schoolId, filters);
  }
}
