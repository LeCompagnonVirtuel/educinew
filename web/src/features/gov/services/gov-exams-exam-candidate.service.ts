import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamCandidate, ExamCandidateCreate } from '@educi/types';
import { GovExamCandidateNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsExamCandidateService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ExamCandidate> {
    const item = await this.repo.findExamCandidateById(schoolId, id);
    if (!item) throw new GovExamCandidateNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ExamCandidate[]> {
    return this.repo.findAllExamCandidates(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ExamCandidateCreate>): Promise<ExamCandidate> {
    return this.repo.createExamCandidate(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ExamCandidateCreate>): Promise<ExamCandidate> {
    const existing = await this.repo.findExamCandidateById(schoolId, id);
    if (!existing) throw new GovExamCandidateNotFoundError(id);
    return this.repo.updateExamCandidate(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamCandidateById(schoolId, id);
    if (!existing) throw new GovExamCandidateNotFoundError(id);
    return this.repo.deleteExamCandidate(schoolId, id);
  }
}
