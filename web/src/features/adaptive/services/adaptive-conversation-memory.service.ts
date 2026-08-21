import type { SupabaseClient } from '@supabase/supabase-js';
import type { ConversationMemory, ConversationMemoryCreate } from '@educi/types';
import { AdaptiveConversationMemoryNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveConversationMemoryService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getMemory(schoolId: string, id: string): Promise<ConversationMemory> {
    const item = await this.repo.getConversationMemory(schoolId, id);
    if (!item) throw new AdaptiveConversationMemoryNotFoundError(id);
    return item;
  }
  async listMemories(schoolId: string, filters?: Record<string, unknown>): Promise<ConversationMemory[]> {
    return this.repo.listConversationMemories(schoolId, filters);
  }
  async createMemory(schoolId: string, data: ConversationMemoryCreate): Promise<ConversationMemory> {
    return this.repo.createConversationMemory(schoolId, data);
  }
  async updateMemory(schoolId: string, id: string, data: Partial<ConversationMemoryCreate>): Promise<ConversationMemory> {
    const existing = await this.repo.getConversationMemory(schoolId, id);
    if (!existing) throw new AdaptiveConversationMemoryNotFoundError(id);
    return this.repo.updateConversationMemory(schoolId, id, data);
  }
  async deleteMemory(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getConversationMemory(schoolId, id);
    if (!existing) throw new AdaptiveConversationMemoryNotFoundError(id);
    return this.repo.deleteConversationMemory(schoolId, id);
  }
}
