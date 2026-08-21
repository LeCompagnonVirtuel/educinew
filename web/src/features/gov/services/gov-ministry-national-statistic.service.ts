import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalStatistic, NationalStatisticCreate } from '@educi/types';
import { GovNationalStatisticNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryNationalStatisticService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<NationalStatistic> {
    const item = await this.repo.findNationalStatisticById(schoolId, id);
    if (!item) throw new GovNationalStatisticNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<NationalStatistic[]> {
    return this.repo.findAllNationalStatistics(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<NationalStatisticCreate>): Promise<NationalStatistic> {
    return this.repo.createNationalStatistic(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<NationalStatisticCreate>): Promise<NationalStatistic> {
    const existing = await this.repo.findNationalStatisticById(schoolId, id);
    if (!existing) throw new GovNationalStatisticNotFoundError(id);
    return this.repo.updateNationalStatistic(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalStatisticById(schoolId, id);
    if (!existing) throw new GovNationalStatisticNotFoundError(id);
    return this.repo.deleteNationalStatistic(schoolId, id);
  }
}
