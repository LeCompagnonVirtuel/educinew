// Government & National Governance Service - CampusGroupMember
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CampusGroupMember, CampusGroupMemberCreate } from '@educi/types';
import { GovCampusGroupMemberNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCampusGroupMemberService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCampusGroupMember(schoolId: string, id: string): Promise<CampusGroupMember> {
    const item = await this.repo.findCampusGroupMemberById(schoolId, id);
    if (!item) throw new GovCampusGroupMemberNotFoundError(id);
    return item;
  }

  async listCampusGroupMembers(schoolId: string, filters?: Record<string, unknown>): Promise<CampusGroupMember[]> {
    return this.repo.findAllCampusGroupMembers(schoolId, filters);
  }

  async createCampusGroupMember(schoolId: string, data: CampusGroupMemberCreate): Promise<CampusGroupMember> {
    return this.repo.createCampusGroupMember(schoolId, data);
  }

  async updateCampusGroupMember(schoolId: string, id: string, data: Partial<CampusGroupMemberCreate>): Promise<CampusGroupMember> {
    const existing = await this.repo.findCampusGroupMemberById(schoolId, id);
    if (!existing) throw new GovCampusGroupMemberNotFoundError(id);
    return this.repo.updateCampusGroupMember(schoolId, id, data);
  }

  async deleteCampusGroupMember(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusGroupMemberById(schoolId, id);
    if (!existing) throw new GovCampusGroupMemberNotFoundError(id);
    return this.repo.deleteCampusGroupMember(schoolId, id);
  }

  async countCampusGroupMembers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCampusGroupMembers(schoolId, filters);
  }
}
