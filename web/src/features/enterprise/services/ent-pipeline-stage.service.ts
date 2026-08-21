// Enterprise Platform Service - PipelineStage
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PipelineStage, PipelineStageCreate } from '@educi/types';
import { EntPipelineStageNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPipelineStageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPipelineStage(schoolId: string, id: string): Promise<PipelineStage> {
    const item = await this.repo.findPipelineStageById(schoolId, id);
    if (!item) throw new EntPipelineStageNotFoundError(id);
    return item;
  }
  async listPipelineStages(schoolId: string, filters?: Record<string, unknown>): Promise<PipelineStage[]> {
    return this.repo.findAllPipelineStages(schoolId, filters);
  }
  async createPipelineStage(schoolId: string, data: PipelineStageCreate): Promise<PipelineStage> {
    return this.repo.createPipelineStage(schoolId, data);
  }
  async updatePipelineStage(schoolId: string, id: string, data: Partial<PipelineStageCreate>): Promise<PipelineStage> {
    const existing = await this.repo.findPipelineStageById(schoolId, id);
    if (!existing) throw new EntPipelineStageNotFoundError(id);
    return this.repo.updatePipelineStage(schoolId, id, data);
  }
  async deletePipelineStage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPipelineStageById(schoolId, id);
    if (!existing) throw new EntPipelineStageNotFoundError(id);
    return this.repo.deletePipelineStage(schoolId, id);
  }
  async countPipelineStages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPipelineStages(schoolId, filters);
  }
}
