// Intelligence Platform Service - SentimentAnalysis
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SentimentAnalysis, SentimentAnalysisCreate } from '@educi/types';
import { IntSentimentNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntSentimentService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getSentimentAnalysis(schoolId: string, id: string): Promise<SentimentAnalysis> {
    const item = await this.repo.getSentimentAnalysis(id, schoolId);
    if (!item) throw new IntSentimentNotFoundError(id);
    return item;
  }
  async listSentimentAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<SentimentAnalysis[]> {
    return this.repo.listSentimentAnalyses(schoolId, filters);
  }
  async createSentimentAnalysis(schoolId: string, data: SentimentAnalysisCreate): Promise<SentimentAnalysis> {
    return this.repo.createSentimentAnalysis({ ...data, school_id: schoolId });
  }
  async updateSentimentAnalysis(schoolId: string, id: string, data: Partial<SentimentAnalysisCreate>): Promise<SentimentAnalysis> {
    const existing = await this.repo.getSentimentAnalysis(id, schoolId);
    if (!existing) throw new IntSentimentNotFoundError(id);
    return this.repo.updateSentimentAnalysis(id, schoolId, data);
  }
  async deleteSentimentAnalysis(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSentimentAnalysis(id, schoolId);
    if (!existing) throw new IntSentimentNotFoundError(id);
    return this.repo.deleteSentimentAnalysis(id, schoolId);
  }
}
