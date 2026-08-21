import type { SupabaseClient } from '@supabase/supabase-js';
import type { PrivateSchoolGroup, PrivateSchoolGroupCreate } from '@educi/types';
import { GovPrivateSchoolGroupNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPortalPrivateSchoolGroupService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<PrivateSchoolGroup> {
    const item = await this.repo.findPrivateSchoolGroupById(schoolId, id);
    if (!item) throw new GovPrivateSchoolGroupNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<PrivateSchoolGroup[]> {
    return this.repo.findAllPrivateSchoolGroups(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<PrivateSchoolGroupCreate>): Promise<PrivateSchoolGroup> {
    return this.repo.createPrivateSchoolGroup(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<PrivateSchoolGroupCreate>): Promise<PrivateSchoolGroup> {
    const existing = await this.repo.findPrivateSchoolGroupById(schoolId, id);
    if (!existing) throw new GovPrivateSchoolGroupNotFoundError(id);
    return this.repo.updatePrivateSchoolGroup(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPrivateSchoolGroupById(schoolId, id);
    if (!existing) throw new GovPrivateSchoolGroupNotFoundError(id);
    return this.repo.deletePrivateSchoolGroup(schoolId, id);
  }
}
