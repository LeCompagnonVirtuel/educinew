// Government & National Governance Service - NationalStandard
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalStandard, NationalStandardCreate } from '@educi/types';
import { GovNationalStandardNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNationalStandardService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNationalStandard(schoolId: string, id: string): Promise<NationalStandard> {
    const item = await this.repo.findNationalStandardById(schoolId, id);
    if (!item) throw new GovNationalStandardNotFoundError(id);
    return item;
  }

  async listNationalStandards(schoolId: string, filters?: Record<string, unknown>): Promise<NationalStandard[]> {
    return this.repo.findAllNationalStandards(schoolId, filters);
  }

  async createNationalStandard(schoolId: string, data: NationalStandardCreate): Promise<NationalStandard> {
    return this.repo.createNationalStandard(schoolId, data);
  }

  async updateNationalStandard(schoolId: string, id: string, data: Partial<NationalStandardCreate>): Promise<NationalStandard> {
    const existing = await this.repo.findNationalStandardById(schoolId, id);
    if (!existing) throw new GovNationalStandardNotFoundError(id);
    return this.repo.updateNationalStandard(schoolId, id, data);
  }

  async deleteNationalStandard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalStandardById(schoolId, id);
    if (!existing) throw new GovNationalStandardNotFoundError(id);
    return this.repo.deleteNationalStandard(schoolId, id);
  }

  async countNationalStandards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNationalStandards(schoolId, filters);
  }
}
