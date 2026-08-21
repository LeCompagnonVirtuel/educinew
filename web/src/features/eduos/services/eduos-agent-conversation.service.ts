import type { SupabaseClient } from '@supabase/supabase-js';
import type { AgentConversation } from '@educi/types';
import { EduOSAgentConversationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAgentConversationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAgentConversation(schoolId: string, id: string): Promise<AgentConversation> {
    const item = await this.repo.getAgentConversation(schoolId, id);
    if (!item) throw new EduOSAgentConversationError(id);
    return item;
  }
  async listAgentConversations(schoolId: string, filters?: Record<string, unknown>): Promise<AgentConversation[]> {
    return this.repo.listAgentConversations(schoolId, filters);
  }
  async createAgentConversation(schoolId: string, data: Partial<AgentConversation>): Promise<AgentConversation> {
    return this.repo.createAgentConversation(schoolId, data as any);
  }
  async updateAgentConversation(schoolId: string, id: string, data: Partial<AgentConversation>): Promise<AgentConversation> {
    const existing = await this.repo.getAgentConversation(schoolId, id);
    if (!existing) throw new EduOSAgentConversationError(id);
    return this.repo.updateAgentConversation(schoolId, id, data as any);
  }
  async deleteAgentConversation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAgentConversation(schoolId, id);
    if (!existing) throw new EduOSAgentConversationError(id);
    return this.repo.deleteAgentConversation(schoolId, id);
  }
}

