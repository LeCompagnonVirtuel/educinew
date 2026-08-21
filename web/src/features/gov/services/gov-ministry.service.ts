// Government & National Governance Service - Ministry
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Ministry, MinistryCreate } from '@educi/types';
import { GovMinistryNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getMinistry(schoolId: string, id: string): Promise<Ministry> {
    const item = await this.repo.findMinistryById(schoolId, id);
    if (!item) throw new GovMinistryNotFoundError(id);
    return item;
  }

  async listMinistries(schoolId: string, filters?: Record<string, unknown>): Promise<Ministry[]> {
    return this.repo.findAllMinistries(schoolId, filters);
  }

  async createMinistry(schoolId: string, data: MinistryCreate): Promise<Ministry> {
    return this.repo.createMinistry(schoolId, data);
  }

  async updateMinistry(schoolId: string, id: string, data: Partial<MinistryCreate>): Promise<Ministry> {
    const existing = await this.repo.findMinistryById(schoolId, id);
    if (!existing) throw new GovMinistryNotFoundError(id);
    return this.repo.updateMinistry(schoolId, id, data);
  }

  async deleteMinistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryById(schoolId, id);
    if (!existing) throw new GovMinistryNotFoundError(id);
    return this.repo.deleteMinistry(schoolId, id);
  }

  async countMinistries(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMinistries(schoolId, filters);
  }
}
