// Government & National Governance Service - ScholarshipApplication
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ScholarshipApplication, ScholarshipApplicationCreate } from '@educi/types';
import { GovScholarshipApplicationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovScholarshipApplicationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getScholarshipApplication(schoolId: string, id: string): Promise<ScholarshipApplication> {
    const item = await this.repo.findScholarshipApplicationById(schoolId, id);
    if (!item) throw new GovScholarshipApplicationNotFoundError(id);
    return item;
  }

  async listScholarshipApplications(schoolId: string, filters?: Record<string, unknown>): Promise<ScholarshipApplication[]> {
    return this.repo.findAllScholarshipApplications(schoolId, filters);
  }

  async createScholarshipApplication(schoolId: string, data: ScholarshipApplicationCreate): Promise<ScholarshipApplication> {
    return this.repo.createScholarshipApplication(schoolId, data);
  }

  async updateScholarshipApplication(schoolId: string, id: string, data: Partial<ScholarshipApplicationCreate>): Promise<ScholarshipApplication> {
    const existing = await this.repo.findScholarshipApplicationById(schoolId, id);
    if (!existing) throw new GovScholarshipApplicationNotFoundError(id);
    return this.repo.updateScholarshipApplication(schoolId, id, data);
  }

  async deleteScholarshipApplication(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findScholarshipApplicationById(schoolId, id);
    if (!existing) throw new GovScholarshipApplicationNotFoundError(id);
    return this.repo.deleteScholarshipApplication(schoolId, id);
  }

  async countScholarshipApplications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countScholarshipApplications(schoolId, filters);
  }
}
