// Intelligence Platform Service - AIInsight
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIInsight, AIInsightCreate } from '@educi/types';
import { IntAIInsightNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntAIInsightService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getAIInsight(schoolId: string, id: string): Promise<AIInsight> {
    const item = await this.repo.getAIInsight(id, schoolId);
    if (!item) throw new IntAIInsightNotFoundError(id);
    return item;
  }
  async listAIInsights(schoolId: string, filters?: Record<string, unknown>): Promise<AIInsight[]> {
    return this.repo.listAIInsights(schoolId, filters);
  }
  async createAIInsight(schoolId: string, data: AIInsightCreate): Promise<AIInsight> {
    return this.repo.createAIInsight({ ...data, school_id: schoolId });
  }
  async updateAIInsight(schoolId: string, id: string, data: Partial<AIInsightCreate>): Promise<AIInsight> {
    const existing = await this.repo.getAIInsight(id, schoolId);
    if (!existing) throw new IntAIInsightNotFoundError(id);
    return this.repo.updateAIInsight(id, schoolId, data);
  }
  async deleteAIInsight(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAIInsight(id, schoolId);
    if (!existing) throw new IntAIInsightNotFoundError(id);
    return this.repo.deleteAIInsight(id, schoolId);
  }
}
