import type { SupabaseClient } from '@supabase/supabase-js';
import type { ConceptExplanation, ConceptExplanationCreate } from '@educi/types';
import { AdaptiveConceptExplanationNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveConceptExplanationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getExplanation(schoolId: string, id: string): Promise<ConceptExplanation> {
    const item = await this.repo.getConceptExplanation(schoolId, id);
    if (!item) throw new AdaptiveConceptExplanationNotFoundError(id);
    return item;
  }
  async listExplanations(schoolId: string, filters?: Record<string, unknown>): Promise<ConceptExplanation[]> {
    return this.repo.listConceptExplanations(schoolId, filters);
  }
  async createExplanation(schoolId: string, data: ConceptExplanationCreate): Promise<ConceptExplanation> {
    return this.repo.createConceptExplanation(schoolId, data);
  }
  async updateExplanation(schoolId: string, id: string, data: Partial<ConceptExplanationCreate>): Promise<ConceptExplanation> {
    const existing = await this.repo.getConceptExplanation(schoolId, id);
    if (!existing) throw new AdaptiveConceptExplanationNotFoundError(id);
    return this.repo.updateConceptExplanation(schoolId, id, data);
  }
  async deleteExplanation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getConceptExplanation(schoolId, id);
    if (!existing) throw new AdaptiveConceptExplanationNotFoundError(id);
    return this.repo.deleteConceptExplanation(schoolId, id);
  }
}
