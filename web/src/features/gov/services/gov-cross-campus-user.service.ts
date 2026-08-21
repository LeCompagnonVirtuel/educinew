// Government & National Governance Service - CrossCampusUser
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CrossCampusUser, CrossCampusUserCreate } from '@educi/types';
import { GovCrossCampusUserNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCrossCampusUserService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCrossCampusUser(schoolId: string, id: string): Promise<CrossCampusUser> {
    const item = await this.repo.findCrossCampusUserById(schoolId, id);
    if (!item) throw new GovCrossCampusUserNotFoundError(id);
    return item;
  }

  async listCrossCampusUsers(schoolId: string, filters?: Record<string, unknown>): Promise<CrossCampusUser[]> {
    return this.repo.findAllCrossCampusUsers(schoolId, filters);
  }

  async createCrossCampusUser(schoolId: string, data: CrossCampusUserCreate): Promise<CrossCampusUser> {
    return this.repo.createCrossCampusUser(schoolId, data);
  }

  async updateCrossCampusUser(schoolId: string, id: string, data: Partial<CrossCampusUserCreate>): Promise<CrossCampusUser> {
    const existing = await this.repo.findCrossCampusUserById(schoolId, id);
    if (!existing) throw new GovCrossCampusUserNotFoundError(id);
    return this.repo.updateCrossCampusUser(schoolId, id, data);
  }

  async deleteCrossCampusUser(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCrossCampusUserById(schoolId, id);
    if (!existing) throw new GovCrossCampusUserNotFoundError(id);
    return this.repo.deleteCrossCampusUser(schoolId, id);
  }

  async countCrossCampusUsers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCrossCampusUsers(schoolId, filters);
  }
}
