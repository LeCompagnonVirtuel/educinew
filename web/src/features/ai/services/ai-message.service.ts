import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiMessage, AiMessageQuery, AiMessageCreate, AiMessageUpdate } from '@educi/types';
import { AiMessageNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiMessageService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getMessage(schoolId: string, id: string): Promise<AiMessage> {
    const message = await this.repo.findById(schoolId, id);
    if (!message) throw new AiMessageNotFoundError(id);
    return message;
  }

  async listMessages(schoolId: string, query: AiMessageQuery): Promise<AiMessage[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createMessage(schoolId: string, data: AiMessageCreate): Promise<AiMessage> {
    return this.repo.create(schoolId, data);
  }

  async updateMessage(schoolId: string, id: string, data: AiMessageUpdate): Promise<AiMessage> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiMessageNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteMessage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiMessageNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getMessagesBySession(schoolId: string, sessionId: string): Promise<AiMessage[]> {
    return this.repo.findMessagesBySessionId(schoolId, sessionId);
  }
}
