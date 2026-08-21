import type { SupabaseClient } from '@supabase/supabase-js';
import type { AITutor, AITutorCreate } from '@educi/types';
import { AdaptiveTutorNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveTutorService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getTutor(schoolId: string, id: string): Promise<AITutor> {
    const item = await this.repo.getAITutor(schoolId, id);
    if (!item) throw new AdaptiveTutorNotFoundError(id);
    return item;
  }
  async listTutors(schoolId: string, filters?: Record<string, unknown>): Promise<AITutor[]> {
    return this.repo.listAITutors(schoolId, filters);
  }
  async createTutor(schoolId: string, data: AITutorCreate): Promise<AITutor> {
    return this.repo.createAITutor(schoolId, data);
  }
  async updateTutor(schoolId: string, id: string, data: Partial<AITutorCreate>): Promise<AITutor> {
    const existing = await this.repo.getAITutor(schoolId, id);
    if (!existing) throw new AdaptiveTutorNotFoundError(id);
    return this.repo.updateAITutor(schoolId, id, data);
  }
  async deleteTutor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAITutor(schoolId, id);
    if (!existing) throw new AdaptiveTutorNotFoundError(id);
    return this.repo.deleteAITutor(schoolId, id);
  }
}
