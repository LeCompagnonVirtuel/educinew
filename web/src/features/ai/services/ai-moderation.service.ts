import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiModeration, AiModerationQuery, AiModerationCreate, AiModerationUpdate } from '@educi/types';
import { AiModerationNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiModerationService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getModeration(schoolId: string, id: string): Promise<AiModeration> {
    const moderation = await this.repo.findById(schoolId, id);
    if (!moderation) throw new AiModerationNotFoundError(id);
    return moderation;
  }

  async listModerations(schoolId: string, query: AiModerationQuery): Promise<AiModeration[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createModeration(schoolId: string, data: AiModerationCreate): Promise<AiModeration> {
    return this.repo.create(schoolId, data);
  }

  async updateModeration(schoolId: string, id: string, data: AiModerationUpdate): Promise<AiModeration> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiModerationNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteModeration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiModerationNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async moderateContent(schoolId: string, content: string): Promise<AiModerationResult> {
    return this.repo.moderateContent(schoolId, content);
  }
}
