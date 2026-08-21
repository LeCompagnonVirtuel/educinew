// Government & National Governance Service - CrossBorderResearch
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CrossBorderResearch, CrossBorderResearchCreate } from '@educi/types';
import { GovCrossBorderResearchNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCrossBorderResearchService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCrossBorderResearch(schoolId: string, id: string): Promise<CrossBorderResearch> {
    const item = await this.repo.findCrossBorderResearchById(schoolId, id);
    if (!item) throw new GovCrossBorderResearchNotFoundError(id);
    return item;
  }

  async listCrossBorderResearch(schoolId: string, filters?: Record<string, unknown>): Promise<CrossBorderResearch[]> {
    return this.repo.findAllCrossBorderResearch(schoolId, filters);
  }

  async createCrossBorderResearch(schoolId: string, data: CrossBorderResearchCreate): Promise<CrossBorderResearch> {
    return this.repo.createCrossBorderResearch(schoolId, data);
  }

  async updateCrossBorderResearch(schoolId: string, id: string, data: Partial<CrossBorderResearchCreate>): Promise<CrossBorderResearch> {
    const existing = await this.repo.findCrossBorderResearchById(schoolId, id);
    if (!existing) throw new GovCrossBorderResearchNotFoundError(id);
    return this.repo.updateCrossBorderResearch(schoolId, id, data);
  }

  async deleteCrossBorderResearch(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCrossBorderResearchById(schoolId, id);
    if (!existing) throw new GovCrossBorderResearchNotFoundError(id);
    return this.repo.deleteCrossBorderResearch(schoolId, id);
  }

  async countCrossBorderResearch(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCrossBorderResearch(schoolId, filters);
  }
}
