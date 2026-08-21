import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccreditationAssessment, AccreditationAssessmentCreate } from '@educi/types';
import { GovAccreditationAssessmentNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCooperationAccreditationAssessmentService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<AccreditationAssessment> {
    const item = await this.repo.findAccreditationAssessmentById(schoolId, id);
    if (!item) throw new GovAccreditationAssessmentNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationAssessment[]> {
    return this.repo.findAllAccreditationAssessments(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<AccreditationAssessmentCreate>): Promise<AccreditationAssessment> {
    return this.repo.createAccreditationAssessment(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<AccreditationAssessmentCreate>): Promise<AccreditationAssessment> {
    const existing = await this.repo.findAccreditationAssessmentById(schoolId, id);
    if (!existing) throw new GovAccreditationAssessmentNotFoundError(id);
    return this.repo.updateAccreditationAssessment(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationAssessmentById(schoolId, id);
    if (!existing) throw new GovAccreditationAssessmentNotFoundError(id);
    return this.repo.deleteAccreditationAssessment(schoolId, id);
  }
}
