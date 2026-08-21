// Government & National Governance Service - ExamSession
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamSession, ExamSessionCreate } from '@educi/types';
import { GovExamSessionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamSessionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamSession(schoolId: string, id: string): Promise<ExamSession> {
    const item = await this.repo.findExamSessionById(schoolId, id);
    if (!item) throw new GovExamSessionNotFoundError(id);
    return item;
  }

  async listExamSessions(schoolId: string, filters?: Record<string, unknown>): Promise<ExamSession[]> {
    return this.repo.findAllExamSessions(schoolId, filters);
  }

  async createExamSession(schoolId: string, data: ExamSessionCreate): Promise<ExamSession> {
    return this.repo.createExamSession(schoolId, data);
  }

  async updateExamSession(schoolId: string, id: string, data: Partial<ExamSessionCreate>): Promise<ExamSession> {
    const existing = await this.repo.findExamSessionById(schoolId, id);
    if (!existing) throw new GovExamSessionNotFoundError(id);
    return this.repo.updateExamSession(schoolId, id, data);
  }

  async deleteExamSession(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamSessionById(schoolId, id);
    if (!existing) throw new GovExamSessionNotFoundError(id);
    return this.repo.deleteExamSession(schoolId, id);
  }

  async countExamSessions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamSessions(schoolId, filters);
  }
}
