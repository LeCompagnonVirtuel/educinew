// Government & National Governance Service - AccreditationStandard
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccreditationStandard, AccreditationStandardCreate } from '@educi/types';
import { GovAccreditationStandardNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAccreditationStandardService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAccreditationStandard(schoolId: string, id: string): Promise<AccreditationStandard> {
    const item = await this.repo.findAccreditationStandardById(schoolId, id);
    if (!item) throw new GovAccreditationStandardNotFoundError(id);
    return item;
  }

  async listAccreditationStandards(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationStandard[]> {
    return this.repo.findAllAccreditationStandards(schoolId, filters);
  }

  async createAccreditationStandard(schoolId: string, data: AccreditationStandardCreate): Promise<AccreditationStandard> {
    return this.repo.createAccreditationStandard(schoolId, data);
  }

  async updateAccreditationStandard(schoolId: string, id: string, data: Partial<AccreditationStandardCreate>): Promise<AccreditationStandard> {
    const existing = await this.repo.findAccreditationStandardById(schoolId, id);
    if (!existing) throw new GovAccreditationStandardNotFoundError(id);
    return this.repo.updateAccreditationStandard(schoolId, id, data);
  }

  async deleteAccreditationStandard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationStandardById(schoolId, id);
    if (!existing) throw new GovAccreditationStandardNotFoundError(id);
    return this.repo.deleteAccreditationStandard(schoolId, id);
  }

  async countAccreditationStandards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccreditationStandards(schoolId, filters);
  }
}
