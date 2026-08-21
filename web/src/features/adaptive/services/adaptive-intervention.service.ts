import type { SupabaseClient } from '@supabase/supabase-js';
import type { InterventionSuggestion, InterventionSuggestionCreate } from '@educi/types';
import { AdaptiveInterventionNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveInterventionService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getInterventionSuggestion(schoolId: string, id: string): Promise<InterventionSuggestion> {
    const item = await this.repo.getInterventionSuggestion(schoolId, id);
    if (!item) throw new AdaptiveInterventionNotFoundError(id);
    return item;
  }
  async listInterventionSuggestions(schoolId: string, filters?: Record<string, unknown>): Promise<InterventionSuggestion[]> {
    return this.repo.listInterventionSuggestions(schoolId, filters);
  }
  async createInterventionSuggestion(schoolId: string, data: InterventionSuggestionCreate): Promise<InterventionSuggestion> {
    return this.repo.createInterventionSuggestion(schoolId, { ...data } as any);
  }
  async updateInterventionSuggestion(schoolId: string, id: string, data: Partial<InterventionSuggestionCreate>): Promise<InterventionSuggestion> {
    const existing = await this.repo.getInterventionSuggestion(schoolId, id);
    if (!existing) throw new AdaptiveInterventionNotFoundError(id);
    return this.repo.updateInterventionSuggestion(schoolId, id, data);
  }
  async deleteInterventionSuggestion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getInterventionSuggestion(schoolId, id);
    if (!existing) throw new AdaptiveInterventionNotFoundError(id);
    return this.repo.deleteInterventionSuggestion(schoolId, id);
  }
}
