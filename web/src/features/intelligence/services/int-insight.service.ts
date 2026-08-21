// Intelligence Platform Service - IntelligenceInsight
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceInsight, IntelligenceInsightCreate } from '@educi/types';
import { IntInsightNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntInsightService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getInsight(schoolId: string, id: string): Promise<IntelligenceInsight> {
    const item = await this.repo.getInsight(id, schoolId);
    if (!item) throw new IntInsightNotFoundError(id);
    return item;
  }
  async listInsights(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceInsight[]> {
    return this.repo.listInsights(schoolId, filters);
  }
  async createInsight(schoolId: string, data: IntelligenceInsightCreate): Promise<IntelligenceInsight> {
    return this.repo.createInsight({ ...data, school_id: schoolId });
  }
  async updateInsight(schoolId: string, id: string, data: Partial<IntelligenceInsightCreate>): Promise<IntelligenceInsight> {
    const existing = await this.repo.getInsight(id, schoolId);
    if (!existing) throw new IntInsightNotFoundError(id);
    return this.repo.updateInsight(id, schoolId, data);
  }
  async deleteInsight(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getInsight(id, schoolId);
    if (!existing) throw new IntInsightNotFoundError(id);
    return this.repo.deleteInsight(id, schoolId);
  }
}
