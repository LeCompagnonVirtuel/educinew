import type { SupabaseClient } from '@supabase/supabase-js';
import type { ConceptReinforcement, ConceptReinforcementCreate } from '@educi/types';
import { AdaptiveConceptReinforcementNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveConceptReinforcementService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getConceptReinforcement(schoolId: string, id: string): Promise<ConceptReinforcement> {
    const item = await this.repo.getConceptReinforcement(schoolId, id);
    if (!item) throw new AdaptiveConceptReinforcementNotFoundError(id);
    return item;
  }
  async listConceptReinforcements(schoolId: string, filters?: Record<string, unknown>): Promise<ConceptReinforcement[]> {
    return this.repo.listConceptReinforcements(schoolId, filters);
  }
  async createConceptReinforcement(schoolId: string, data: ConceptReinforcementCreate): Promise<ConceptReinforcement> {
    return this.repo.createConceptReinforcement(schoolId, { ...data } as any);
  }
  async updateConceptReinforcement(schoolId: string, id: string, data: Partial<ConceptReinforcementCreate>): Promise<ConceptReinforcement> {
    const existing = await this.repo.getConceptReinforcement(schoolId, id);
    if (!existing) throw new AdaptiveConceptReinforcementNotFoundError(id);
    return this.repo.updateConceptReinforcement(schoolId, id, data);
  }
  async deleteConceptReinforcement(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getConceptReinforcement(schoolId, id);
    if (!existing) throw new AdaptiveConceptReinforcementNotFoundError(id);
    return this.repo.deleteConceptReinforcement(schoolId, id);
  }
}
