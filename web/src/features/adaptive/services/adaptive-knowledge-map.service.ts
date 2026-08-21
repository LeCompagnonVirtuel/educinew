// Adaptive Learning Service - KnowledgeMap
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { KnowledgeMap } from '@educi/types';
import { AdaptiveKnowledgeMapNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveKnowledgeMapService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getKnowledgeMap(schoolId: string, id: string): Promise<KnowledgeMap> {
    const item = await this.repo.getKnowledgeMap(schoolId, id);
    if (!item) throw new AdaptiveKnowledgeMapNotFoundError(id);
    return item;
  }
  async listKnowledgeMaps(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeMap[]> {
    return this.repo.listKnowledgeMaps(schoolId, filters);
  }
  async createKnowledgeMap(schoolId: string, data: Omit<KnowledgeMap, 'id' | 'created_at' | 'updated_at'>): Promise<KnowledgeMap> {
    return this.repo.createKnowledgeMap(schoolId, data);
  }
  async updateKnowledgeMap(schoolId: string, id: string, data: Partial<Omit<KnowledgeMap, 'id' | 'created_at' | 'updated_at'>>): Promise<KnowledgeMap> {
    const existing = await this.repo.getKnowledgeMap(schoolId, id);
    if (!existing) throw new AdaptiveKnowledgeMapNotFoundError(id);
    return this.repo.updateKnowledgeMap(schoolId, id, data);
  }
  async deleteKnowledgeMap(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getKnowledgeMap(schoolId, id);
    if (!existing) throw new AdaptiveKnowledgeMapNotFoundError(id);
    return this.repo.deleteKnowledgeMap(schoolId, id);
  }
}
