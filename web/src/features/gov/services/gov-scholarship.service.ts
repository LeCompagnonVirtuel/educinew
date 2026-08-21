// Government & National Governance Service - Scholarship
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Scholarship, ScholarshipCreate } from '@educi/types';
import { GovScholarshipNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovScholarshipService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getScholarship(schoolId: string, id: string): Promise<Scholarship> {
    const item = await this.repo.findScholarshipById(schoolId, id);
    if (!item) throw new GovScholarshipNotFoundError(id);
    return item;
  }

  async listScholarships(schoolId: string, filters?: Record<string, unknown>): Promise<Scholarship[]> {
    return this.repo.findAllScholarships(schoolId, filters);
  }

  async createScholarship(schoolId: string, data: ScholarshipCreate): Promise<Scholarship> {
    return this.repo.createScholarship(schoolId, data);
  }

  async updateScholarship(schoolId: string, id: string, data: Partial<ScholarshipCreate>): Promise<Scholarship> {
    const existing = await this.repo.findScholarshipById(schoolId, id);
    if (!existing) throw new GovScholarshipNotFoundError(id);
    return this.repo.updateScholarship(schoolId, id, data);
  }

  async deleteScholarship(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findScholarshipById(schoolId, id);
    if (!existing) throw new GovScholarshipNotFoundError(id);
    return this.repo.deleteScholarship(schoolId, id);
  }

  async countScholarships(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countScholarships(schoolId, filters);
  }
}
