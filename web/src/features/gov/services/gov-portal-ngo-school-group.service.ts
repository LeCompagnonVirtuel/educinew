import type { SupabaseClient } from '@supabase/supabase-js';
import type { NgoSchoolGroup, NgoSchoolGroupCreate } from '@educi/types';
import { GovNgoSchoolGroupNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPortalNgoSchoolGroupService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<NgoSchoolGroup> {
    const item = await this.repo.findNgoSchoolGroupById(schoolId, id);
    if (!item) throw new GovNgoSchoolGroupNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<NgoSchoolGroup[]> {
    return this.repo.findAllNgoSchoolGroups(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<NgoSchoolGroupCreate>): Promise<NgoSchoolGroup> {
    return this.repo.createNgoSchoolGroup(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<NgoSchoolGroupCreate>): Promise<NgoSchoolGroup> {
    const existing = await this.repo.findNgoSchoolGroupById(schoolId, id);
    if (!existing) throw new GovNgoSchoolGroupNotFoundError(id);
    return this.repo.updateNgoSchoolGroup(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNgoSchoolGroupById(schoolId, id);
    if (!existing) throw new GovNgoSchoolGroupNotFoundError(id);
    return this.repo.deleteNgoSchoolGroup(schoolId, id);
  }
}
