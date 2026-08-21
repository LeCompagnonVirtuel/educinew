// Government & National Governance Service - NationalStatistic
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalStatistic, NationalStatisticCreate } from '@educi/types';
import { GovNationalStatisticNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNationalStatisticService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNationalStatistic(schoolId: string, id: string): Promise<NationalStatistic> {
    const item = await this.repo.findNationalStatisticById(schoolId, id);
    if (!item) throw new GovNationalStatisticNotFoundError(id);
    return item;
  }

  async listNationalStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<NationalStatistic[]> {
    return this.repo.findAllNationalStatistics(schoolId, filters);
  }

  async createNationalStatistic(schoolId: string, data: NationalStatisticCreate): Promise<NationalStatistic> {
    return this.repo.createNationalStatistic(schoolId, data);
  }

  async updateNationalStatistic(schoolId: string, id: string, data: Partial<NationalStatisticCreate>): Promise<NationalStatistic> {
    const existing = await this.repo.findNationalStatisticById(schoolId, id);
    if (!existing) throw new GovNationalStatisticNotFoundError(id);
    return this.repo.updateNationalStatistic(schoolId, id, data);
  }

  async deleteNationalStatistic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalStatisticById(schoolId, id);
    if (!existing) throw new GovNationalStatisticNotFoundError(id);
    return this.repo.deleteNationalStatistic(schoolId, id);
  }

  async countNationalStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNationalStatistics(schoolId, filters);
  }
}
