// Intelligence Platform Service - IntelligenceScore
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceScore, IntelligenceScoreCreate } from '@educi/types';
import { IntScoreNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntScoreService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getScore(schoolId: string, id: string): Promise<IntelligenceScore> {
    const item = await this.repo.getScore(id, schoolId);
    if (!item) throw new IntScoreNotFoundError(id);
    return item;
  }
  async listScores(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceScore[]> {
    return this.repo.listScores(schoolId, filters);
  }
  async createScore(schoolId: string, data: IntelligenceScoreCreate): Promise<IntelligenceScore> {
    return this.repo.createScore({ ...data, school_id: schoolId });
  }
  async updateScore(schoolId: string, id: string, data: Partial<IntelligenceScoreCreate>): Promise<IntelligenceScore> {
    const existing = await this.repo.getScore(id, schoolId);
    if (!existing) throw new IntScoreNotFoundError(id);
    return this.repo.updateScore(id, schoolId, data);
  }
  async deleteScore(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getScore(id, schoolId);
    if (!existing) throw new IntScoreNotFoundError(id);
    return this.repo.deleteScore(id, schoolId);
  }
}
