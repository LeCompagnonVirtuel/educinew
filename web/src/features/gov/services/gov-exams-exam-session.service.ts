import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamSession, ExamSessionCreate } from '@educi/types';
import { GovExamSessionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsExamSessionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ExamSession> {
    const item = await this.repo.findExamSessionById(schoolId, id);
    if (!item) throw new GovExamSessionNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ExamSession[]> {
    return this.repo.findAllExamSessions(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ExamSessionCreate>): Promise<ExamSession> {
    return this.repo.createExamSession(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ExamSessionCreate>): Promise<ExamSession> {
    const existing = await this.repo.findExamSessionById(schoolId, id);
    if (!existing) throw new GovExamSessionNotFoundError(id);
    return this.repo.updateExamSession(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamSessionById(schoolId, id);
    if (!existing) throw new GovExamSessionNotFoundError(id);
    return this.repo.deleteExamSession(schoolId, id);
  }
}
