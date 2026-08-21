import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccreditationStandard, AccreditationStandardCreate } from '@educi/types';
import { GovAccreditationStandardNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCooperationAccreditationStandardService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<AccreditationStandard> {
    const item = await this.repo.findAccreditationStandardById(schoolId, id);
    if (!item) throw new GovAccreditationStandardNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationStandard[]> {
    return this.repo.findAllAccreditationStandards(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<AccreditationStandardCreate>): Promise<AccreditationStandard> {
    return this.repo.createAccreditationStandard(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<AccreditationStandardCreate>): Promise<AccreditationStandard> {
    const existing = await this.repo.findAccreditationStandardById(schoolId, id);
    if (!existing) throw new GovAccreditationStandardNotFoundError(id);
    return this.repo.updateAccreditationStandard(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationStandardById(schoolId, id);
    if (!existing) throw new GovAccreditationStandardNotFoundError(id);
    return this.repo.deleteAccreditationStandard(schoolId, id);
  }
}
