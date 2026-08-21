// Government & National Governance Service - AccreditationAssessment
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccreditationAssessment, AccreditationAssessmentCreate } from '@educi/types';
import { GovAccreditationAssessmentNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAccreditationAssessmentService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAccreditationAssessment(schoolId: string, id: string): Promise<AccreditationAssessment> {
    const item = await this.repo.findAccreditationAssessmentById(schoolId, id);
    if (!item) throw new GovAccreditationAssessmentNotFoundError(id);
    return item;
  }

  async listAccreditationAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationAssessment[]> {
    return this.repo.findAllAccreditationAssessments(schoolId, filters);
  }

  async createAccreditationAssessment(schoolId: string, data: AccreditationAssessmentCreate): Promise<AccreditationAssessment> {
    return this.repo.createAccreditationAssessment(schoolId, data);
  }

  async updateAccreditationAssessment(schoolId: string, id: string, data: Partial<AccreditationAssessmentCreate>): Promise<AccreditationAssessment> {
    const existing = await this.repo.findAccreditationAssessmentById(schoolId, id);
    if (!existing) throw new GovAccreditationAssessmentNotFoundError(id);
    return this.repo.updateAccreditationAssessment(schoolId, id, data);
  }

  async deleteAccreditationAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationAssessmentById(schoolId, id);
    if (!existing) throw new GovAccreditationAssessmentNotFoundError(id);
    return this.repo.deleteAccreditationAssessment(schoolId, id);
  }

  async countAccreditationAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccreditationAssessments(schoolId, filters);
  }
}
