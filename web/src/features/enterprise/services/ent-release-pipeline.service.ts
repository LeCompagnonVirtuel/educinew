// Enterprise Platform Service - ReleasePipeline
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReleasePipeline, ReleasePipelineCreate } from '@educi/types';
import { EntReleasePipelineNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReleasePipelineService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReleasePipeline(schoolId: string, id: string): Promise<ReleasePipeline> {
    const item = await this.repo.findReleasePipelineById(schoolId, id);
    if (!item) throw new EntReleasePipelineNotFoundError(id);
    return item;
  }
  async listReleasePipelines(schoolId: string, filters?: Record<string, unknown>): Promise<ReleasePipeline[]> {
    return this.repo.findAllReleasePipelines(schoolId, filters);
  }
  async createReleasePipeline(schoolId: string, data: ReleasePipelineCreate): Promise<ReleasePipeline> {
    return this.repo.createReleasePipeline(schoolId, data);
  }
  async updateReleasePipeline(schoolId: string, id: string, data: Partial<ReleasePipelineCreate>): Promise<ReleasePipeline> {
    const existing = await this.repo.findReleasePipelineById(schoolId, id);
    if (!existing) throw new EntReleasePipelineNotFoundError(id);
    return this.repo.updateReleasePipeline(schoolId, id, data);
  }
  async deleteReleasePipeline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReleasePipelineById(schoolId, id);
    if (!existing) throw new EntReleasePipelineNotFoundError(id);
    return this.repo.deleteReleasePipeline(schoolId, id);
  }
  async countReleasePipelines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReleasePipelines(schoolId, filters);
  }
}
