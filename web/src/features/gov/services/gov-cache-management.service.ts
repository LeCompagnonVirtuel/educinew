// Government & National Governance Service - CacheManagement
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheManagement, CacheManagementCreate } from '@educi/types';
import { GovCacheManagementNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCacheManagementService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCacheManagement(schoolId: string, id: string): Promise<CacheManagement> {
    const item = await this.repo.findCacheManagementById(schoolId, id);
    if (!item) throw new GovCacheManagementNotFoundError(id);
    return item;
  }

  async listCacheManagements(schoolId: string, filters?: Record<string, unknown>): Promise<CacheManagement[]> {
    return this.repo.findAllCacheManagements(schoolId, filters);
  }

  async createCacheManagement(schoolId: string, data: CacheManagementCreate): Promise<CacheManagement> {
    return this.repo.createCacheManagement(schoolId, data);
  }

  async updateCacheManagement(schoolId: string, id: string, data: Partial<CacheManagementCreate>): Promise<CacheManagement> {
    const existing = await this.repo.findCacheManagementById(schoolId, id);
    if (!existing) throw new GovCacheManagementNotFoundError(id);
    return this.repo.updateCacheManagement(schoolId, id, data);
  }

  async deleteCacheManagement(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheManagementById(schoolId, id);
    if (!existing) throw new GovCacheManagementNotFoundError(id);
    return this.repo.deleteCacheManagement(schoolId, id);
  }

  async countCacheManagements(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheManagements(schoolId, filters);
  }
}
