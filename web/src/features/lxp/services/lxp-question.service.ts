import type { SupabaseClient } from '@supabase/supabase-js';
import type { Question, QuestionCreate } from '@educi/types';
import { LxpQuestionNotFoundError, LxpQuestionCreateError, LxpQuestionUpdateError, LxpQuestionDeleteError, LxpQuestionImportError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpQuestionService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getQuestion(schoolId: string, id: string): Promise<Question> {
    const question = await this.repo.findQuestionById(schoolId, id);
    if (!question) throw new LxpQuestionNotFoundError(id);
    return question;
  }

  async listQuestions(quizId: string): Promise<readonly Question[]> {
    return this.repo.findQuestions(quizId);
  }

  async createQuestion(data: QuestionCreate): Promise<Question> {
    const created = await this.repo.createQuestion(data);
    if (!created) throw new LxpQuestionCreateError();
    return created;
  }

  async updateQuestion(schoolId: string, id: string, data: Partial<QuestionCreate>): Promise<Question> {
    const existing = await this.repo.findQuestionById(schoolId, id);
    if (!existing) throw new LxpQuestionNotFoundError(id);
    const updated = await this.repo.updateQuestion(id, data);
    if (!updated) throw new LxpQuestionUpdateError();
    return updated;
  }

  async deleteQuestion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQuestionById(schoolId, id);
    if (!existing) throw new LxpQuestionNotFoundError(id);
    const deleted = await this.repo.deleteQuestion(id);
    if (!deleted) throw new LxpQuestionDeleteError();
  }
}
