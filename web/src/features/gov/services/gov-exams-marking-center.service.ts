import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarkingCenter, MarkingCenterCreate } from '@educi/types';
import { GovMarkingCenterNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsMarkingCenterService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<MarkingCenter> {
    const item = await this.repo.findMarkingCenterById(schoolId, id);
    if (!item) throw new GovMarkingCenterNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<MarkingCenter[]> {
    return this.repo.findAllMarkingCenters(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<MarkingCenterCreate>): Promise<MarkingCenter> {
    return this.repo.createMarkingCenter(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<MarkingCenterCreate>): Promise<MarkingCenter> {
    const existing = await this.repo.findMarkingCenterById(schoolId, id);
    if (!existing) throw new GovMarkingCenterNotFoundError(id);
    return this.repo.updateMarkingCenter(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMarkingCenterById(schoolId, id);
    if (!existing) throw new GovMarkingCenterNotFoundError(id);
    return this.repo.deleteMarkingCenter(schoolId, id);
  }
}
