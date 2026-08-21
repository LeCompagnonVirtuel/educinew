import type { SupabaseClient } from '@supabase/supabase-js';
import type { Submission, SubmissionCreate, SubmissionFeedback } from '@educi/types';
import { LxpSubmissionNotFoundError, LxpSubmissionCreateError, LxpSubmissionUpdateError, LxpSubmissionDeleteError, LxpSubmissionGradeError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpSubmissionService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getSubmission(schoolId: string, id: string): Promise<Submission> {
    const submission = await this.repo.findSubmissionById(schoolId, id);
    if (!submission) throw new LxpSubmissionNotFoundError(id);
    return submission;
  }

  async listSubmissions(assignmentId: string, userId?: string): Promise<readonly Submission[]> {
    return this.repo.findSubmissions(assignmentId, userId);
  }

  async createSubmission(assignmentId: string, userId: string, data: SubmissionCreate): Promise<Submission> {
    const created = await this.repo.createSubmission(assignmentId, userId, data);
    if (!created) throw new LxpSubmissionCreateError();
    return created;
  }

  async updateSubmission(schoolId: string, id: string, data: Partial<SubmissionCreate>): Promise<Submission> {
    const existing = await this.repo.findSubmissionById(schoolId, id);
    if (!existing) throw new LxpSubmissionNotFoundError(id);
    const updated = await this.repo.updateSubmission(id, data);
    if (!updated) throw new LxpSubmissionUpdateError();
    return updated;
  }

  async deleteSubmission(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSubmissionById(schoolId, id);
    if (!existing) throw new LxpSubmissionNotFoundError(id);
    const deleted = await this.repo.deleteSubmission(id);
    if (!deleted) throw new LxpSubmissionDeleteError();
  }

  async gradeSubmission(schoolId: string, id: string, score: number, feedback?: SubmissionFeedback): Promise<Submission> {
    const existing = await this.repo.findSubmissionById(schoolId, id);
    if (!existing) throw new LxpSubmissionNotFoundError(id);
    const graded = await this.repo.gradeSubmission(id, score, feedback);
    if (!graded) throw new LxpSubmissionGradeError();
    return graded;
  }
}
