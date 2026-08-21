// Government & National Governance Service - InternationalSchoolGroup
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalSchoolGroup, InternationalSchoolGroupCreate } from '@educi/types';
import { GovInternationalSchoolGroupNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInternationalSchoolGroupService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInternationalSchoolGroup(schoolId: string, id: string): Promise<InternationalSchoolGroup> {
    const item = await this.repo.findInternationalSchoolGroupById(schoolId, id);
    if (!item) throw new GovInternationalSchoolGroupNotFoundError(id);
    return item;
  }

  async listInternationalSchoolGroups(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalSchoolGroup[]> {
    return this.repo.findAllInternationalSchoolGroups(schoolId, filters);
  }

  async createInternationalSchoolGroup(schoolId: string, data: InternationalSchoolGroupCreate): Promise<InternationalSchoolGroup> {
    return this.repo.createInternationalSchoolGroup(schoolId, data);
  }

  async updateInternationalSchoolGroup(schoolId: string, id: string, data: Partial<InternationalSchoolGroupCreate>): Promise<InternationalSchoolGroup> {
    const existing = await this.repo.findInternationalSchoolGroupById(schoolId, id);
    if (!existing) throw new GovInternationalSchoolGroupNotFoundError(id);
    return this.repo.updateInternationalSchoolGroup(schoolId, id, data);
  }

  async deleteInternationalSchoolGroup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalSchoolGroupById(schoolId, id);
    if (!existing) throw new GovInternationalSchoolGroupNotFoundError(id);
    return this.repo.deleteInternationalSchoolGroup(schoolId, id);
  }

  async countInternationalSchoolGroups(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInternationalSchoolGroups(schoolId, filters);
  }
}
