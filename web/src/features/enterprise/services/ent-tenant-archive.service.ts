// Enterprise Platform Service - TenantArchive
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantArchive, TenantArchiveCreate } from '@educi/types';
import { EntTenantArchiveNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantArchiveService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantArchive(schoolId: string, id: string): Promise<TenantArchive> {
    const item = await this.repo.findTenantArchiveById(schoolId, id);
    if (!item) throw new EntTenantArchiveNotFoundError(id);
    return item;
  }
  async listTenantArchives(schoolId: string, filters?: Record<string, unknown>): Promise<TenantArchive[]> {
    return this.repo.findAllTenantArchives(schoolId, filters);
  }
  async createTenantArchive(schoolId: string, data: TenantArchiveCreate): Promise<TenantArchive> {
    return this.repo.createTenantArchive(schoolId, data);
  }
  async updateTenantArchive(schoolId: string, id: string, data: Partial<TenantArchiveCreate>): Promise<TenantArchive> {
    const existing = await this.repo.findTenantArchiveById(schoolId, id);
    if (!existing) throw new EntTenantArchiveNotFoundError(id);
    return this.repo.updateTenantArchive(schoolId, id, data);
  }
  async deleteTenantArchive(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantArchiveById(schoolId, id);
    if (!existing) throw new EntTenantArchiveNotFoundError(id);
    return this.repo.deleteTenantArchive(schoolId, id);
  }
  async countTenantArchives(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantArchives(schoolId, filters);
  }
}
