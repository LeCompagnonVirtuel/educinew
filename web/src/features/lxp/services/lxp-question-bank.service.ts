import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuestionBank, QuestionBankQuery, QuestionBankStats, Question } from '@educi/types';
import { LxpQuestionBankNotFoundError, LxpQuestionBankCreateError, LxpQuestionNotFoundError, LxpQuestionCreateError, LxpQuestionUpdateError, LxpQuestionDeleteError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpQuestionBankService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getQuestionBank(schoolId: string, id: string): Promise<QuestionBank> {
    const bank = await this.repo.findQuestionBankById(schoolId, id);
    if (!bank) throw new LxpQuestionBankNotFoundError(id);
    return bank;
  }

  async listQuestionBanks(courseId: string): Promise<readonly QuestionBank[]> {
    return this.repo.findQuestionBanks(courseId);
  }

  async createQuestionBank(data: Omit<QuestionBank, 'id' | 'createdAt' | 'updatedAt' | 'questionCount' | 'isShared' | 'createdBy'>): Promise<QuestionBank> {
    const created = await this.repo.createQuestionBank(data);
    if (!created) throw new LxpQuestionBankCreateError();
    return created;
  }

  async getQuestionBankStats(schoolId: string, id: string): Promise<QuestionBankStats> {
    const existing = await this.repo.findQuestionBankById(schoolId, id);
    if (!existing) throw new LxpQuestionBankNotFoundError(id);
    const stats = await this.repo.getQuestionBankStats(id);
    if (!stats) throw new LxpQuestionBankNotFoundError();
    return stats;
  }

  async deleteQuestionBank(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQuestionBankById(schoolId, id);
    if (!existing) throw new LxpQuestionBankNotFoundError(id);
    await this.repo.deleteQuestionBank(id);
  }

  async searchQuestions(bankId: string, query: QuestionBankQuery): Promise<readonly Question[]> {
    const questions = await this.repo.searchQuestions(bankId, query);
    return questions;
  }
}
