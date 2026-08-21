// Government & National Governance Service - MinistryUser
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryUser, MinistryUserCreate } from '@educi/types';
import { GovMinistryUserNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryUserService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getMinistryUser(schoolId: string, id: string): Promise<MinistryUser> {
    const item = await this.repo.findMinistryUserById(schoolId, id);
    if (!item) throw new GovMinistryUserNotFoundError(id);
    return item;
  }

  async listMinistryUsers(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryUser[]> {
    return this.repo.findAllMinistryUsers(schoolId, filters);
  }

  async createMinistryUser(schoolId: string, data: MinistryUserCreate): Promise<MinistryUser> {
    return this.repo.createMinistryUser(schoolId, data);
  }

  async updateMinistryUser(schoolId: string, id: string, data: Partial<MinistryUserCreate>): Promise<MinistryUser> {
    const existing = await this.repo.findMinistryUserById(schoolId, id);
    if (!existing) throw new GovMinistryUserNotFoundError(id);
    return this.repo.updateMinistryUser(schoolId, id, data);
  }

  async deleteMinistryUser(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryUserById(schoolId, id);
    if (!existing) throw new GovMinistryUserNotFoundError(id);
    return this.repo.deleteMinistryUser(schoolId, id);
  }

  async countMinistryUsers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMinistryUsers(schoolId, filters);
  }
}
