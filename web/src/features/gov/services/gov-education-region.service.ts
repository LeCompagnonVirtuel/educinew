// Government & National Governance Service - EducationRegion
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationRegion, EducationRegionCreate } from '@educi/types';
import { GovEducationRegionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEducationRegionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEducationRegion(schoolId: string, id: string): Promise<EducationRegion> {
    const item = await this.repo.findEducationRegionById(schoolId, id);
    if (!item) throw new GovEducationRegionNotFoundError(id);
    return item;
  }

  async listEducationRegions(schoolId: string, filters?: Record<string, unknown>): Promise<EducationRegion[]> {
    return this.repo.findAllEducationRegions(schoolId, filters);
  }

  async createEducationRegion(schoolId: string, data: EducationRegionCreate): Promise<EducationRegion> {
    return this.repo.createEducationRegion(schoolId, data);
  }

  async updateEducationRegion(schoolId: string, id: string, data: Partial<EducationRegionCreate>): Promise<EducationRegion> {
    const existing = await this.repo.findEducationRegionById(schoolId, id);
    if (!existing) throw new GovEducationRegionNotFoundError(id);
    return this.repo.updateEducationRegion(schoolId, id, data);
  }

  async deleteEducationRegion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationRegionById(schoolId, id);
    if (!existing) throw new GovEducationRegionNotFoundError(id);
    return this.repo.deleteEducationRegion(schoolId, id);
  }

  async countEducationRegions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEducationRegions(schoolId, filters);
  }
}
