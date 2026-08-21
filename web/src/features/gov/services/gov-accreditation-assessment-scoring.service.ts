// Government & National Governance Service - AccreditationAssessmentScoring
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccreditationAssessmentScoring, AccreditationAssessmentScoringCreate } from '@educi/types';
import { GovAccreditationAssessmentScoringNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAccreditationAssessmentScoringService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAccreditationAssessmentScoring(schoolId: string, id: string): Promise<AccreditationAssessmentScoring> {
    const item = await this.repo.findAccreditationAssessmentScoringById(schoolId, id);
    if (!item) throw new GovAccreditationAssessmentScoringNotFoundError(id);
    return item;
  }

  async listAccreditationAssessmentScorings(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationAssessmentScoring[]> {
    return this.repo.findAllAccreditationAssessmentScorings(schoolId, filters);
  }

  async createAccreditationAssessmentScoring(schoolId: string, data: AccreditationAssessmentScoringCreate): Promise<AccreditationAssessmentScoring> {
    return this.repo.createAccreditationAssessmentScoring(schoolId, data);
  }

  async updateAccreditationAssessmentScoring(schoolId: string, id: string, data: Partial<AccreditationAssessmentScoringCreate>): Promise<AccreditationAssessmentScoring> {
    const existing = await this.repo.findAccreditationAssessmentScoringById(schoolId, id);
    if (!existing) throw new GovAccreditationAssessmentScoringNotFoundError(id);
    return this.repo.updateAccreditationAssessmentScoring(schoolId, id, data);
  }

  async deleteAccreditationAssessmentScoring(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationAssessmentScoringById(schoolId, id);
    if (!existing) throw new GovAccreditationAssessmentScoringNotFoundError(id);
    return this.repo.deleteAccreditationAssessmentScoring(schoolId, id);
  }

  async countAccreditationAssessmentScorings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccreditationAssessmentScorings(schoolId, filters);
  }
}
