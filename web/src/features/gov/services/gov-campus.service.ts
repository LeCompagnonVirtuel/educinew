// Government & National Governance Service - Campus
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Campus, CampusCreate } from '@educi/types';
import { GovCampusNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCampusService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCampus(schoolId: string, id: string): Promise<Campus> {
    const item = await this.repo.findCampusById(schoolId, id);
    if (!item) throw new GovCampusNotFoundError(id);
    return item;
  }

  async listCampuses(schoolId: string, filters?: Record<string, unknown>): Promise<Campus[]> {
    return this.repo.findAllCampuses(schoolId, filters);
  }

  async createCampus(schoolId: string, data: CampusCreate): Promise<Campus> {
    return this.repo.createCampus(schoolId, data);
  }

  async updateCampus(schoolId: string, id: string, data: Partial<CampusCreate>): Promise<Campus> {
    const existing = await this.repo.findCampusById(schoolId, id);
    if (!existing) throw new GovCampusNotFoundError(id);
    return this.repo.updateCampus(schoolId, id, data);
  }

  async deleteCampus(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusById(schoolId, id);
    if (!existing) throw new GovCampusNotFoundError(id);
    return this.repo.deleteCampus(schoolId, id);
  }

  async countCampuses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCampuses(schoolId, filters);
  }
}
