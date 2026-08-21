// Enterprise Platform Service - MigrationManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MigrationManager, MigrationManagerCreate } from '@educi/types';
import { EntMigrationManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMigrationManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMigrationManager(schoolId: string, id: string): Promise<MigrationManager> {
    const item = await this.repo.findMigrationManagerById(schoolId, id);
    if (!item) throw new EntMigrationManagerNotFoundError(id);
    return item;
  }
  async listMigrationManagers(schoolId: string, filters?: Record<string, unknown>): Promise<MigrationManager[]> {
    return this.repo.findAllMigrationManagers(schoolId, filters);
  }
  async createMigrationManager(schoolId: string, data: MigrationManagerCreate): Promise<MigrationManager> {
    return this.repo.createMigrationManager(schoolId, data);
  }
  async updateMigrationManager(schoolId: string, id: string, data: Partial<MigrationManagerCreate>): Promise<MigrationManager> {
    const existing = await this.repo.findMigrationManagerById(schoolId, id);
    if (!existing) throw new EntMigrationManagerNotFoundError(id);
    return this.repo.updateMigrationManager(schoolId, id, data);
  }
  async deleteMigrationManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMigrationManagerById(schoolId, id);
    if (!existing) throw new EntMigrationManagerNotFoundError(id);
    return this.repo.deleteMigrationManager(schoolId, id);
  }
  async countMigrationManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMigrationManagers(schoolId, filters);
  }
}
