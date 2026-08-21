// Intelligence Platform Service - IntelligenceEngine
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceEngine, IntelligenceEngineCreate } from '@educi/types';
import { IntEngineNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntEngineService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getEngine(schoolId: string, id: string): Promise<IntelligenceEngine> {
    const item = await this.repo.getEngine(id, schoolId);
    if (!item) throw new IntEngineNotFoundError(id);
    return item;
  }
  async listEngines(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceEngine[]> {
    return this.repo.listEngines(schoolId, filters);
  }
  async createEngine(schoolId: string, data: IntelligenceEngineCreate): Promise<IntelligenceEngine> {
    return this.repo.createEngine({ ...data, school_id: schoolId });
  }
  async updateEngine(schoolId: string, id: string, data: Partial<IntelligenceEngineCreate>): Promise<IntelligenceEngine> {
    const existing = await this.repo.getEngine(id, schoolId);
    if (!existing) throw new IntEngineNotFoundError(id);
    return this.repo.updateEngine(id, schoolId, data);
  }
  async deleteEngine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEngine(id, schoolId);
    if (!existing) throw new IntEngineNotFoundError(id);
    return this.repo.deleteEngine(id, schoolId);
  }
}
