// Intelligence Platform Service - AIModel
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIModel, AIModelCreate } from '@educi/types';
import { IntModelNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntModelService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getModel(schoolId: string, id: string): Promise<AIModel> {
    const item = await this.repo.getModel(id, schoolId);
    if (!item) throw new IntModelNotFoundError(id);
    return item;
  }
  async listModels(schoolId: string, filters?: Record<string, unknown>): Promise<AIModel[]> {
    return this.repo.listModels(schoolId, filters);
  }
  async createModel(schoolId: string, data: AIModelCreate): Promise<AIModel> {
    return this.repo.createModel({ ...data, school_id: schoolId });
  }
  async updateModel(schoolId: string, id: string, data: Partial<AIModelCreate>): Promise<AIModel> {
    const existing = await this.repo.getModel(id, schoolId);
    if (!existing) throw new IntModelNotFoundError(id);
    return this.repo.updateModel(id, schoolId, data);
  }
  async deleteModel(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getModel(id, schoolId);
    if (!existing) throw new IntModelNotFoundError(id);
    return this.repo.deleteModel(id, schoolId);
  }
}
