// Enterprise Platform Service - TenantMigration
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantMigration, TenantMigrationCreate } from '@educi/types';
import { EntTenantMigrationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantMigrationServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantMigrationService(schoolId: string, id: string): Promise<TenantMigration> {
    const item = await this.repo.findTenantMigrationServiceById(schoolId, id);
    if (!item) throw new EntTenantMigrationNotFoundError(id);
    return item;
  }
  async listTenantMigrationServices(schoolId: string, filters?: Record<string, unknown>): Promise<TenantMigration[]> {
    return this.repo.findAllTenantMigrationServices(schoolId, filters);
  }
  async createTenantMigrationService(schoolId: string, data: TenantMigrationCreate): Promise<TenantMigration> {
    return this.repo.createTenantMigrationService(schoolId, data);
  }
  async updateTenantMigrationService(schoolId: string, id: string, data: Partial<TenantMigrationCreate>): Promise<TenantMigration> {
    const existing = await this.repo.findTenantMigrationServiceById(schoolId, id);
    if (!existing) throw new EntTenantMigrationNotFoundError(id);
    return this.repo.updateTenantMigrationService(schoolId, id, data);
  }
  async deleteTenantMigrationService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantMigrationServiceById(schoolId, id);
    if (!existing) throw new EntTenantMigrationNotFoundError(id);
    return this.repo.deleteTenantMigrationService(schoolId, id);
  }
  async countTenantMigrationServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantMigrationServices(schoolId, filters);
  }
}
