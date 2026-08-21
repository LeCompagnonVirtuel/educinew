import type { SupabaseClient } from '@supabase/supabase-js';
import type { Quiz, QuizCreate, QuizUpdate, QuizAnalytics, QuizListResult } from '@educi/types';
import { LxpQuizNotFoundError, LxpQuizCreateError, LxpQuizUpdateError, LxpQuizDeleteError, LxpQuizPublishError, LxpQuizStartError, LxpQuizSubmitError, LxpQuizGradeError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpQuizService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getQuiz(schoolId: string, id: string): Promise<Quiz> {
    const quiz = await this.repo.findQuizById(schoolId, id);
    if (!quiz) throw new LxpQuizNotFoundError(id);
    return quiz;
  }

  async listQuizzes(courseId: string): Promise<QuizListResult> {
    return this.repo.findQuizzes(courseId);
  }

  async createQuiz(data: QuizCreate): Promise<Quiz> {
    const created = await this.repo.createQuiz(data);
    if (!created) throw new LxpQuizCreateError();
    return created;
  }

  async updateQuiz(schoolId: string, id: string, data: QuizUpdate): Promise<Quiz> {
    const existing = await this.repo.findQuizById(schoolId, id);
    if (!existing) throw new LxpQuizNotFoundError(id);
    const updated = await this.repo.updateQuiz(id, data);
    if (!updated) throw new LxpQuizUpdateError();
    return updated;
  }

  async deleteQuiz(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQuizById(schoolId, id);
    if (!existing) throw new LxpQuizNotFoundError(id);
    const deleted = await this.repo.deleteQuiz(id);
    if (!deleted) throw new LxpQuizDeleteError();
  }

  async publishQuiz(schoolId: string, id: string): Promise<Quiz> {
    const existing = await this.repo.findQuizById(schoolId, id);
    if (!existing) throw new LxpQuizNotFoundError(id);
    const published = await this.repo.publishQuiz(id);
    if (!published) throw new LxpQuizPublishError();
    return published;
  }

  async startQuizAttempt(quizId: string, userId: string): Promise<string> {
    const attemptId = await this.repo.startQuizAttempt(quizId, userId);
    if (!attemptId) throw new LxpQuizStartError();
    return attemptId;
  }

  async getQuizAnalytics(schoolId: string, id: string): Promise<QuizAnalytics> {
    const existing = await this.repo.findQuizById(schoolId, id);
    if (!existing) throw new LxpQuizNotFoundError(id);
    const analytics = await this.repo.getQuizAnalytics(id);
    if (!analytics) throw new LxpQuizGradeError();
    return analytics;
  }
}
