// Enterprise Platform Service - PipelineRun
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PipelineRun, PipelineRunCreate } from '@educi/types';
import { EntPipelineRunNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPipelineRunService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPipelineRun(schoolId: string, id: string): Promise<PipelineRun> {
    const item = await this.repo.findPipelineRunById(schoolId, id);
    if (!item) throw new EntPipelineRunNotFoundError(id);
    return item;
  }
  async listPipelineRuns(schoolId: string, filters?: Record<string, unknown>): Promise<PipelineRun[]> {
    return this.repo.findAllPipelineRuns(schoolId, filters);
  }
  async createPipelineRun(schoolId: string, data: PipelineRunCreate): Promise<PipelineRun> {
    return this.repo.createPipelineRun(schoolId, data);
  }
  async updatePipelineRun(schoolId: string, id: string, data: Partial<PipelineRunCreate>): Promise<PipelineRun> {
    const existing = await this.repo.findPipelineRunById(schoolId, id);
    if (!existing) throw new EntPipelineRunNotFoundError(id);
    return this.repo.updatePipelineRun(schoolId, id, data);
  }
  async deletePipelineRun(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPipelineRunById(schoolId, id);
    if (!existing) throw new EntPipelineRunNotFoundError(id);
    return this.repo.deletePipelineRun(schoolId, id);
  }
  async countPipelineRuns(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPipelineRuns(schoolId, filters);
  }
}
