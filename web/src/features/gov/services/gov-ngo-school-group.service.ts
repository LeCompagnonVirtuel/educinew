// Government & National Governance Service - NgoSchoolGroup
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NgoSchoolGroup, NgoSchoolGroupCreate } from '@educi/types';
import { GovNgoSchoolGroupNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNgoSchoolGroupService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNgoSchoolGroup(schoolId: string, id: string): Promise<NgoSchoolGroup> {
    const item = await this.repo.findNgoSchoolGroupById(schoolId, id);
    if (!item) throw new GovNgoSchoolGroupNotFoundError(id);
    return item;
  }

  async listNgoSchoolGroups(schoolId: string, filters?: Record<string, unknown>): Promise<NgoSchoolGroup[]> {
    return this.repo.findAllNgoSchoolGroups(schoolId, filters);
  }

  async createNgoSchoolGroup(schoolId: string, data: NgoSchoolGroupCreate): Promise<NgoSchoolGroup> {
    return this.repo.createNgoSchoolGroup(schoolId, data);
  }

  async updateNgoSchoolGroup(schoolId: string, id: string, data: Partial<NgoSchoolGroupCreate>): Promise<NgoSchoolGroup> {
    const existing = await this.repo.findNgoSchoolGroupById(schoolId, id);
    if (!existing) throw new GovNgoSchoolGroupNotFoundError(id);
    return this.repo.updateNgoSchoolGroup(schoolId, id, data);
  }

  async deleteNgoSchoolGroup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNgoSchoolGroupById(schoolId, id);
    if (!existing) throw new GovNgoSchoolGroupNotFoundError(id);
    return this.repo.deleteNgoSchoolGroup(schoolId, id);
  }

  async countNgoSchoolGroups(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNgoSchoolGroups(schoolId, filters);
  }
}
