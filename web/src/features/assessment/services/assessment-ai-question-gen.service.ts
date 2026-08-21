import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIQuestionGenerator, AIQuestionGeneratorCreate } from '@educi/types';
import { AssessmentAIQuestionGeneratorNotFoundError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentAIQuestionGeneratorService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getAIQuestionGenerator(schoolId: string, id: string): Promise<AIQuestionGenerator> {
    const item = await this.repo.getAIQuestionGenerator(id, schoolId);
    if (!item) throw new AssessmentAIQuestionGeneratorNotFoundError(id);
    return item;
  }
  async listAIQuestionGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<AIQuestionGenerator[]> {
    return this.repo.listAIQuestionGenerators(schoolId, filters);
  }
  async createAIQuestionGenerator(schoolId: string, data: AIQuestionGeneratorCreate): Promise<AIQuestionGenerator> {
    return this.repo.createAIQuestionGenerator({ ...data, school_id: schoolId } as any);
  }
  async updateAIQuestionGenerator(schoolId: string, id: string, data: Partial<AIQuestionGeneratorCreate>): Promise<AIQuestionGenerator> {
    const existing = await this.repo.getAIQuestionGenerator(id, schoolId);
    if (!existing) throw new AssessmentAIQuestionGeneratorNotFoundError(id);
    return this.repo.updateAIQuestionGenerator(id, schoolId, data as any);
  }
  async deleteAIQuestionGenerator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAIQuestionGenerator(id, schoolId);
    if (!existing) throw new AssessmentAIQuestionGeneratorNotFoundError(id);
    return this.repo.deleteAIQuestionGenerator(id, schoolId);
  }
}
