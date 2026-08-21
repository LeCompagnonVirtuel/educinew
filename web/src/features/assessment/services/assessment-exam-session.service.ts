import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamSession, ExamSessionCreate } from '@educi/types';
import { AssessmentExamSessionNotFoundError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentExamSessionService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getExamSession(schoolId: string, id: string): Promise<ExamSession> {
    const item = await this.repo.getExamSession(id, schoolId);
    if (!item) throw new AssessmentExamSessionNotFoundError(id);
    return item;
  }
  async listExamSessions(schoolId: string, filters?: Record<string, unknown>): Promise<ExamSession[]> {
    return this.repo.listExamSessions(schoolId, filters);
  }
  async createExamSession(schoolId: string, data: ExamSessionCreate): Promise<ExamSession> {
    return this.repo.createExamSession({ ...data, school_id: schoolId } as any);
  }
  async updateExamSession(schoolId: string, id: string, data: Partial<ExamSessionCreate>): Promise<ExamSession> {
    const existing = await this.repo.getExamSession(id, schoolId);
    if (!existing) throw new AssessmentExamSessionNotFoundError(id);
    return this.repo.updateExamSession(id, schoolId, data as any);
  }
  async deleteExamSession(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getExamSession(id, schoolId);
    if (!existing) throw new AssessmentExamSessionNotFoundError(id);
    return this.repo.deleteExamSession(id, schoolId);
  }
}
