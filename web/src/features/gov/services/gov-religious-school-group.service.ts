// Government & National Governance Service - ReligiousSchoolGroup
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReligiousSchoolGroup, ReligiousSchoolGroupCreate } from '@educi/types';
import { GovReligiousSchoolGroupNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovReligiousSchoolGroupService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getReligiousSchoolGroup(schoolId: string, id: string): Promise<ReligiousSchoolGroup> {
    const item = await this.repo.findReligiousSchoolGroupById(schoolId, id);
    if (!item) throw new GovReligiousSchoolGroupNotFoundError(id);
    return item;
  }

  async listReligiousSchoolGroups(schoolId: string, filters?: Record<string, unknown>): Promise<ReligiousSchoolGroup[]> {
    return this.repo.findAllReligiousSchoolGroups(schoolId, filters);
  }

  async createReligiousSchoolGroup(schoolId: string, data: ReligiousSchoolGroupCreate): Promise<ReligiousSchoolGroup> {
    return this.repo.createReligiousSchoolGroup(schoolId, data);
  }

  async updateReligiousSchoolGroup(schoolId: string, id: string, data: Partial<ReligiousSchoolGroupCreate>): Promise<ReligiousSchoolGroup> {
    const existing = await this.repo.findReligiousSchoolGroupById(schoolId, id);
    if (!existing) throw new GovReligiousSchoolGroupNotFoundError(id);
    return this.repo.updateReligiousSchoolGroup(schoolId, id, data);
  }

  async deleteReligiousSchoolGroup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReligiousSchoolGroupById(schoolId, id);
    if (!existing) throw new GovReligiousSchoolGroupNotFoundError(id);
    return this.repo.deleteReligiousSchoolGroup(schoolId, id);
  }

  async countReligiousSchoolGroups(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReligiousSchoolGroups(schoolId, filters);
  }
}
