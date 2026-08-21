import type { SupabaseClient } from '@supabase/supabase-js';
import type { EssayAssistant, EssayAssistantCreate } from '@educi/types';
import { AdaptiveEssayAssistantNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveEssayAssistantService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAssistant(schoolId: string, id: string): Promise<EssayAssistant> {
    const item = await this.repo.getEssayAssistant(schoolId, id);
    if (!item) throw new AdaptiveEssayAssistantNotFoundError(id);
    return item;
  }
  async listAssistants(schoolId: string, filters?: Record<string, unknown>): Promise<EssayAssistant[]> {
    return this.repo.listEssayAssistants(schoolId, filters);
  }
  async createAssistant(schoolId: string, data: EssayAssistantCreate): Promise<EssayAssistant> {
    return this.repo.createEssayAssistant(schoolId, data);
  }
  async updateAssistant(schoolId: string, id: string, data: Partial<EssayAssistantCreate>): Promise<EssayAssistant> {
    const existing = await this.repo.getEssayAssistant(schoolId, id);
    if (!existing) throw new AdaptiveEssayAssistantNotFoundError(id);
    return this.repo.updateEssayAssistant(schoolId, id, data);
  }
  async deleteAssistant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEssayAssistant(schoolId, id);
    if (!existing) throw new AdaptiveEssayAssistantNotFoundError(id);
    return this.repo.deleteEssayAssistant(schoolId, id);
  }
}
