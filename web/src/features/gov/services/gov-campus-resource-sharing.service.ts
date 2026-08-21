// Government & National Governance Service - CampusResourceSharing
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CampusResourceSharing, CampusResourceSharingCreate } from '@educi/types';
import { GovCampusResourceSharingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCampusResourceSharingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCampusResourceSharing(schoolId: string, id: string): Promise<CampusResourceSharing> {
    const item = await this.repo.findCampusResourceSharingById(schoolId, id);
    if (!item) throw new GovCampusResourceSharingNotFoundError(id);
    return item;
  }

  async listCampusResourceSharings(schoolId: string, filters?: Record<string, unknown>): Promise<CampusResourceSharing[]> {
    return this.repo.findAllCampusResourceSharings(schoolId, filters);
  }

  async createCampusResourceSharing(schoolId: string, data: CampusResourceSharingCreate): Promise<CampusResourceSharing> {
    return this.repo.createCampusResourceSharing(schoolId, data);
  }

  async updateCampusResourceSharing(schoolId: string, id: string, data: Partial<CampusResourceSharingCreate>): Promise<CampusResourceSharing> {
    const existing = await this.repo.findCampusResourceSharingById(schoolId, id);
    if (!existing) throw new GovCampusResourceSharingNotFoundError(id);
    return this.repo.updateCampusResourceSharing(schoolId, id, data);
  }

  async deleteCampusResourceSharing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusResourceSharingById(schoolId, id);
    if (!existing) throw new GovCampusResourceSharingNotFoundError(id);
    return this.repo.deleteCampusResourceSharing(schoolId, id);
  }

  async countCampusResourceSharings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCampusResourceSharings(schoolId, filters);
  }
}
