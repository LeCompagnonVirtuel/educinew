import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuizAttempt } from '@educi/types';
import { LxpQuizAttemptNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpQuizAttemptService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getAttempt(schoolId: string, id: string): Promise<QuizAttempt> {
    const attempt = await this.repo.findQuizAttemptById(schoolId, id);
    if (!attempt) throw new LxpQuizAttemptNotFoundError(id);
    return attempt;
  }

  async listAttempts(quizId: string, userId: string): Promise<readonly QuizAttempt[]> {
    return this.repo.findQuizAttempts(quizId, userId);
  }

  async submitAttempt(attemptId: string, answers: Record<string, unknown>): Promise<QuizAttempt> {
    const submitted = await this.repo.submitQuizAttempt(attemptId, answers);
    if (!submitted) throw new LxpQuizAttemptNotFoundError();
    return submitted;
  }

  async getAttemptResult(schoolId: string, id: string): Promise<QuizAttempt> {
    const attempt = await this.repo.findQuizAttemptById(schoolId, id);
    if (!attempt) throw new LxpQuizAttemptNotFoundError(id);
    return attempt;
  }

  async abandonAttempt(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQuizAttemptById(schoolId, id);
    if (!existing) throw new LxpQuizAttemptNotFoundError(id);
    await this.repo.abandonQuizAttempt(id);
  }
}
