import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalStandard, NationalStandardCreate } from '@educi/types';
import { GovNationalStandardNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovObservatoryNationalStandardService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<NationalStandard> {
    const item = await this.repo.findNationalStandardById(schoolId, id);
    if (!item) throw new GovNationalStandardNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<NationalStandard[]> {
    return this.repo.findAllNationalStandards(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<NationalStandardCreate>): Promise<NationalStandard> {
    return this.repo.createNationalStandard(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<NationalStandardCreate>): Promise<NationalStandard> {
    const existing = await this.repo.findNationalStandardById(schoolId, id);
    if (!existing) throw new GovNationalStandardNotFoundError(id);
    return this.repo.updateNationalStandard(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalStandardById(schoolId, id);
    if (!existing) throw new GovNationalStandardNotFoundError(id);
    return this.repo.deleteNationalStandard(schoolId, id);
  }
}
