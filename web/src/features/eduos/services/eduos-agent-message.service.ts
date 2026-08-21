import type { SupabaseClient } from '@supabase/supabase-js';
import type { AgentMessage } from '@educi/types';
import { EduOSAgentMessageError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAgentMessageService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAgentMessage(schoolId: string, id: string): Promise<AgentMessage> {
    const item = await this.repo.getAgentMessage(schoolId, id);
    if (!item) throw new EduOSAgentMessageError(id);
    return item;
  }
  async listAgentMessages(schoolId: string, filters?: Record<string, unknown>): Promise<AgentMessage[]> {
    return this.repo.listAgentMessages(schoolId, filters);
  }
  async createAgentMessage(schoolId: string, data: Partial<AgentMessage>): Promise<AgentMessage> {
    return this.repo.createAgentMessage(schoolId, data as any);
  }
  async updateAgentMessage(schoolId: string, id: string, data: Partial<AgentMessage>): Promise<AgentMessage> {
    const existing = await this.repo.getAgentMessage(schoolId, id);
    if (!existing) throw new EduOSAgentMessageError(id);
    return this.repo.updateAgentMessage(schoolId, id, data as any);
  }
  async deleteAgentMessage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAgentMessage(schoolId, id);
    if (!existing) throw new EduOSAgentMessageError(id);
    return this.repo.deleteAgentMessage(schoolId, id);
  }
}

