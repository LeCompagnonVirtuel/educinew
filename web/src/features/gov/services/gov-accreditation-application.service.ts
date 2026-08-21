// Government & National Governance Service - AccreditationApplication
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccreditationApplication, AccreditationApplicationCreate } from '@educi/types';
import { GovAccreditationApplicationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAccreditationApplicationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAccreditationApplication(schoolId: string, id: string): Promise<AccreditationApplication> {
    const item = await this.repo.findAccreditationApplicationById(schoolId, id);
    if (!item) throw new GovAccreditationApplicationNotFoundError(id);
    return item;
  }

  async listAccreditationApplications(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationApplication[]> {
    return this.repo.findAllAccreditationApplications(schoolId, filters);
  }

  async createAccreditationApplication(schoolId: string, data: AccreditationApplicationCreate): Promise<AccreditationApplication> {
    return this.repo.createAccreditationApplication(schoolId, data);
  }

  async updateAccreditationApplication(schoolId: string, id: string, data: Partial<AccreditationApplicationCreate>): Promise<AccreditationApplication> {
    const existing = await this.repo.findAccreditationApplicationById(schoolId, id);
    if (!existing) throw new GovAccreditationApplicationNotFoundError(id);
    return this.repo.updateAccreditationApplication(schoolId, id, data);
  }

  async deleteAccreditationApplication(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationApplicationById(schoolId, id);
    if (!existing) throw new GovAccreditationApplicationNotFoundError(id);
    return this.repo.deleteAccreditationApplication(schoolId, id);
  }

  async countAccreditationApplications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccreditationApplications(schoolId, filters);
  }
}
