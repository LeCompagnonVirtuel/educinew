import type { SupabaseClient } from '@supabase/supabase-js';
import type { CampusGroupMember, CampusGroupMemberCreate } from '@educi/types';
import { GovCampusGroupMemberNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDigitalTwinCampusGroupMemberService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<CampusGroupMember> {
    const item = await this.repo.findCampusGroupMemberById(schoolId, id);
    if (!item) throw new GovCampusGroupMemberNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<CampusGroupMember[]> {
    return this.repo.findAllCampusGroupMembers(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CampusGroupMemberCreate>): Promise<CampusGroupMember> {
    return this.repo.createCampusGroupMember(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CampusGroupMemberCreate>): Promise<CampusGroupMember> {
    const existing = await this.repo.findCampusGroupMemberById(schoolId, id);
    if (!existing) throw new GovCampusGroupMemberNotFoundError(id);
    return this.repo.updateCampusGroupMember(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusGroupMemberById(schoolId, id);
    if (!existing) throw new GovCampusGroupMemberNotFoundError(id);
    return this.repo.deleteCampusGroupMember(schoolId, id);
  }
}
