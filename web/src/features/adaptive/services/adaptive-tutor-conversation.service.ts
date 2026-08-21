import type { SupabaseClient } from '@supabase/supabase-js';
import type { TutorConversation, TutorConversationCreate } from '@educi/types';
import { AdaptiveConversationNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveTutorConversationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getConversation(schoolId: string, id: string): Promise<TutorConversation> {
    const item = await this.repo.getTutorConversation(schoolId, id);
    if (!item) throw new AdaptiveConversationNotFoundError(id);
    return item;
  }
  async listConversations(schoolId: string, filters?: Record<string, unknown>): Promise<TutorConversation[]> {
    return this.repo.listTutorConversations(schoolId, filters);
  }
  async createConversation(schoolId: string, data: TutorConversationCreate): Promise<TutorConversation> {
    return this.repo.createTutorConversation(schoolId, data);
  }
  async updateConversation(schoolId: string, id: string, data: Partial<TutorConversationCreate>): Promise<TutorConversation> {
    const existing = await this.repo.getTutorConversation(schoolId, id);
    if (!existing) throw new AdaptiveConversationNotFoundError(id);
    return this.repo.updateTutorConversation(schoolId, id, data);
  }
  async deleteConversation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTutorConversation(schoolId, id);
    if (!existing) throw new AdaptiveConversationNotFoundError(id);
    return this.repo.deleteTutorConversation(schoolId, id);
  }
}
