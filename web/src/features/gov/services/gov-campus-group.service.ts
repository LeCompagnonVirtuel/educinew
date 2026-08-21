// Government & National Governance Service - CampusGroup
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CampusGroup, CampusGroupCreate } from '@educi/types';
import { GovCampusGroupNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCampusGroupService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCampusGroup(schoolId: string, id: string): Promise<CampusGroup> {
    const item = await this.repo.findCampusGroupById(schoolId, id);
    if (!item) throw new GovCampusGroupNotFoundError(id);
    return item;
  }

  async listCampusGroups(schoolId: string, filters?: Record<string, unknown>): Promise<CampusGroup[]> {
    return this.repo.findAllCampusGroups(schoolId, filters);
  }

  async createCampusGroup(schoolId: string, data: CampusGroupCreate): Promise<CampusGroup> {
    return this.repo.createCampusGroup(schoolId, data);
  }

  async updateCampusGroup(schoolId: string, id: string, data: Partial<CampusGroupCreate>): Promise<CampusGroup> {
    const existing = await this.repo.findCampusGroupById(schoolId, id);
    if (!existing) throw new GovCampusGroupNotFoundError(id);
    return this.repo.updateCampusGroup(schoolId, id, data);
  }

  async deleteCampusGroup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusGroupById(schoolId, id);
    if (!existing) throw new GovCampusGroupNotFoundError(id);
    return this.repo.deleteCampusGroup(schoolId, id);
  }

  async countCampusGroups(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCampusGroups(schoolId, filters);
  }
}
