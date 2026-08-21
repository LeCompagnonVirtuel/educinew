// Adaptive Learning Service - SkillGraph
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SkillGraph } from '@educi/types';
import { AdaptiveSkillGraphNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveSkillGraphService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getSkillGraph(schoolId: string, id: string): Promise<SkillGraph> {
    const item = await this.repo.getSkillGraph(schoolId, id);
    if (!item) throw new AdaptiveSkillGraphNotFoundError(id);
    return item;
  }
  async listSkillGraphs(schoolId: string, filters?: Record<string, unknown>): Promise<SkillGraph[]> {
    return this.repo.listSkillGraphs(schoolId, filters);
  }
  async createSkillGraph(schoolId: string, data: Omit<SkillGraph, 'id' | 'created_at' | 'updated_at'>): Promise<SkillGraph> {
    return this.repo.createSkillGraph(schoolId, data);
  }
  async updateSkillGraph(schoolId: string, id: string, data: Partial<Omit<SkillGraph, 'id' | 'created_at' | 'updated_at'>>): Promise<SkillGraph> {
    const existing = await this.repo.getSkillGraph(schoolId, id);
    if (!existing) throw new AdaptiveSkillGraphNotFoundError(id);
    return this.repo.updateSkillGraph(schoolId, id, data);
  }
  async deleteSkillGraph(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSkillGraph(schoolId, id);
    if (!existing) throw new AdaptiveSkillGraphNotFoundError(id);
    return this.repo.deleteSkillGraph(schoolId, id);
  }
}
