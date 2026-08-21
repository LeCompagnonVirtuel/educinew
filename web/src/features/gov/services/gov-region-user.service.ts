// Government & National Governance Service - RegionUser
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionUser, RegionUserCreate } from '@educi/types';
import { GovRegionUserNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegionUserService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRegionUser(schoolId: string, id: string): Promise<RegionUser> {
    const item = await this.repo.findRegionUserById(schoolId, id);
    if (!item) throw new GovRegionUserNotFoundError(id);
    return item;
  }

  async listRegionUsers(schoolId: string, filters?: Record<string, unknown>): Promise<RegionUser[]> {
    return this.repo.findAllRegionUsers(schoolId, filters);
  }

  async createRegionUser(schoolId: string, data: RegionUserCreate): Promise<RegionUser> {
    return this.repo.createRegionUser(schoolId, data);
  }

  async updateRegionUser(schoolId: string, id: string, data: Partial<RegionUserCreate>): Promise<RegionUser> {
    const existing = await this.repo.findRegionUserById(schoolId, id);
    if (!existing) throw new GovRegionUserNotFoundError(id);
    return this.repo.updateRegionUser(schoolId, id, data);
  }

  async deleteRegionUser(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionUserById(schoolId, id);
    if (!existing) throw new GovRegionUserNotFoundError(id);
    return this.repo.deleteRegionUser(schoolId, id);
  }

  async countRegionUsers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRegionUsers(schoolId, filters);
  }
}
