import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalSchoolGroup, InternationalSchoolGroupCreate } from '@educi/types';
import { GovInternationalSchoolGroupNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPortalInternationalSchoolGroupService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InternationalSchoolGroup> {
    const item = await this.repo.findInternationalSchoolGroupById(schoolId, id);
    if (!item) throw new GovInternationalSchoolGroupNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalSchoolGroup[]> {
    return this.repo.findAllInternationalSchoolGroups(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InternationalSchoolGroupCreate>): Promise<InternationalSchoolGroup> {
    return this.repo.createInternationalSchoolGroup(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InternationalSchoolGroupCreate>): Promise<InternationalSchoolGroup> {
    const existing = await this.repo.findInternationalSchoolGroupById(schoolId, id);
    if (!existing) throw new GovInternationalSchoolGroupNotFoundError(id);
    return this.repo.updateInternationalSchoolGroup(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalSchoolGroupById(schoolId, id);
    if (!existing) throw new GovInternationalSchoolGroupNotFoundError(id);
    return this.repo.deleteInternationalSchoolGroup(schoolId, id);
  }
}
