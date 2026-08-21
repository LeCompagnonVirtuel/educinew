import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiInsight, AiInsightQuery, AiInsightCreate, AiInsightUpdate } from '@educi/types';
import { AiInsightNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiInsightService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getInsight(schoolId: string, id: string): Promise<AiInsight> {
    const insight = await this.repo.findById(schoolId, id);
    if (!insight) throw new AiInsightNotFoundError(id);
    return insight;
  }

  async listInsights(schoolId: string, query: AiInsightQuery): Promise<AiInsight[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createInsight(schoolId: string, data: AiInsightCreate): Promise<AiInsight> {
    return this.repo.create(schoolId, data);
  }

  async updateInsight(schoolId: string, id: string, data: AiInsightUpdate): Promise<AiInsight> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiInsightNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteInsight(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiInsightNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getInsightsByType(schoolId: string, type: string): Promise<AiInsight[]> {
    return this.repo.findInsightsByType(schoolId, type);
  }
}
