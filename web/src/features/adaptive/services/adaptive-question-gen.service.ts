import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIQuestionGenerator, AIQuestionGeneratorCreate } from '@educi/types';
import { AdaptiveQuestionGeneratorNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveQuestionGeneratorService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAIQuestionGenerator(schoolId: string, id: string): Promise<AIQuestionGenerator> {
    const item = await this.repo.getAIQuestionGenerator(schoolId, id);
    if (!item) throw new AdaptiveQuestionGeneratorNotFoundError(id);
    return item;
  }
  async listAIQuestionGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<AIQuestionGenerator[]> {
    return this.repo.listAIQuestionGenerators(schoolId, filters);
  }
  async createAIQuestionGenerator(schoolId: string, data: AIQuestionGeneratorCreate): Promise<AIQuestionGenerator> {
    return this.repo.createAIQuestionGenerator(schoolId, { ...data } as any);
  }
  async updateAIQuestionGenerator(schoolId: string, id: string, data: Partial<AIQuestionGeneratorCreate>): Promise<AIQuestionGenerator> {
    const existing = await this.repo.getAIQuestionGenerator(schoolId, id);
    if (!existing) throw new AdaptiveQuestionGeneratorNotFoundError(id);
    return this.repo.updateAIQuestionGenerator(schoolId, id, data);
  }
  async deleteAIQuestionGenerator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAIQuestionGenerator(schoolId, id);
    if (!existing) throw new AdaptiveQuestionGeneratorNotFoundError(id);
    return this.repo.deleteAIQuestionGenerator(schoolId, id);
  }
}
