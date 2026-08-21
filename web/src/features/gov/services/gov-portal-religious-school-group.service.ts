import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReligiousSchoolGroup, ReligiousSchoolGroupCreate } from '@educi/types';
import { GovReligiousSchoolGroupNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPortalReligiousSchoolGroupService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ReligiousSchoolGroup> {
    const item = await this.repo.findReligiousSchoolGroupById(schoolId, id);
    if (!item) throw new GovReligiousSchoolGroupNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ReligiousSchoolGroup[]> {
    return this.repo.findAllReligiousSchoolGroups(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ReligiousSchoolGroupCreate>): Promise<ReligiousSchoolGroup> {
    return this.repo.createReligiousSchoolGroup(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ReligiousSchoolGroupCreate>): Promise<ReligiousSchoolGroup> {
    const existing = await this.repo.findReligiousSchoolGroupById(schoolId, id);
    if (!existing) throw new GovReligiousSchoolGroupNotFoundError(id);
    return this.repo.updateReligiousSchoolGroup(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReligiousSchoolGroupById(schoolId, id);
    if (!existing) throw new GovReligiousSchoolGroupNotFoundError(id);
    return this.repo.deleteReligiousSchoolGroup(schoolId, id);
  }
}
