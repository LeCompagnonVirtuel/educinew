// Intelligence Platform Service - IntelligencePipeline
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligencePipeline, IntelligencePipelineCreate } from '@educi/types';
import { IntPipelineNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntPipelineService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getPipeline(schoolId: string, id: string): Promise<IntelligencePipeline> {
    const item = await this.repo.getPipeline(id, schoolId);
    if (!item) throw new IntPipelineNotFoundError(id);
    return item;
  }
  async listPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligencePipeline[]> {
    return this.repo.listPipelines(schoolId, filters);
  }
  async createPipeline(schoolId: string, data: IntelligencePipelineCreate): Promise<IntelligencePipeline> {
    return this.repo.createPipeline({ ...data, school_id: schoolId });
  }
  async updatePipeline(schoolId: string, id: string, data: Partial<IntelligencePipelineCreate>): Promise<IntelligencePipeline> {
    const existing = await this.repo.getPipeline(id, schoolId);
    if (!existing) throw new IntPipelineNotFoundError(id);
    return this.repo.updatePipeline(id, schoolId, data);
  }
  async deletePipeline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPipeline(id, schoolId);
    if (!existing) throw new IntPipelineNotFoundError(id);
    return this.repo.deletePipeline(id, schoolId);
  }
}
