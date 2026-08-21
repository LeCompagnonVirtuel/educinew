// Government & National Governance Service - CampusSync
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CampusSync, CampusSyncCreate } from '@educi/types';
import { GovCampusSyncNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCampusSyncService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCampusSync(schoolId: string, id: string): Promise<CampusSync> {
    const item = await this.repo.findCampusSyncById(schoolId, id);
    if (!item) throw new GovCampusSyncNotFoundError(id);
    return item;
  }

  async listCampusSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<CampusSync[]> {
    return this.repo.findAllCampusSyncs(schoolId, filters);
  }

  async createCampusSync(schoolId: string, data: CampusSyncCreate): Promise<CampusSync> {
    return this.repo.createCampusSync(schoolId, data);
  }

  async updateCampusSync(schoolId: string, id: string, data: Partial<CampusSyncCreate>): Promise<CampusSync> {
    const existing = await this.repo.findCampusSyncById(schoolId, id);
    if (!existing) throw new GovCampusSyncNotFoundError(id);
    return this.repo.updateCampusSync(schoolId, id, data);
  }

  async deleteCampusSync(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusSyncById(schoolId, id);
    if (!existing) throw new GovCampusSyncNotFoundError(id);
    return this.repo.deleteCampusSync(schoolId, id);
  }

  async countCampusSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCampusSyncs(schoolId, filters);
  }
}
