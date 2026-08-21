// Enterprise Platform Service - TenantMigration
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantMigration, TenantMigrationCreate } from '@educi/types';
import { EntTenantMigrationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantMigrationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantMigration(schoolId: string, id: string): Promise<TenantMigration> {
    const item = await this.repo.findTenantMigrationById(schoolId, id);
    if (!item) throw new EntTenantMigrationNotFoundError(id);
    return item;
  }
  async listTenantMigrations(schoolId: string, filters?: Record<string, unknown>): Promise<TenantMigration[]> {
    return this.repo.findAllTenantMigrations(schoolId, filters);
  }
  async createTenantMigration(schoolId: string, data: TenantMigrationCreate): Promise<TenantMigration> {
    return this.repo.createTenantMigration(schoolId, data);
  }
  async updateTenantMigration(schoolId: string, id: string, data: Partial<TenantMigrationCreate>): Promise<TenantMigration> {
    const existing = await this.repo.findTenantMigrationById(schoolId, id);
    if (!existing) throw new EntTenantMigrationNotFoundError(id);
    return this.repo.updateTenantMigration(schoolId, id, data);
  }
  async deleteTenantMigration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantMigrationById(schoolId, id);
    if (!existing) throw new EntTenantMigrationNotFoundError(id);
    return this.repo.deleteTenantMigration(schoolId, id);
  }
  async countTenantMigrations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantMigrations(schoolId, filters);
  }
}
