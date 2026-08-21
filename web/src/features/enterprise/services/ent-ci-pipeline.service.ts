// Enterprise Platform Service - CIPipeline
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CIPipeline, CIPipelineCreate } from '@educi/types';
import { EntCIPipelineNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCIPipelineService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCIPipeline(schoolId: string, id: string): Promise<CIPipeline> {
    const item = await this.repo.findCIPipelineById(schoolId, id);
    if (!item) throw new EntCIPipelineNotFoundError(id);
    return item;
  }
  async listCIPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<CIPipeline[]> {
    return this.repo.findAllCIPipelines(schoolId, filters);
  }
  async createCIPipeline(schoolId: string, data: CIPipelineCreate): Promise<CIPipeline> {
    return this.repo.createCIPipeline(schoolId, data);
  }
  async updateCIPipeline(schoolId: string, id: string, data: Partial<CIPipelineCreate>): Promise<CIPipeline> {
    const existing = await this.repo.findCIPipelineById(schoolId, id);
    if (!existing) throw new EntCIPipelineNotFoundError(id);
    return this.repo.updateCIPipeline(schoolId, id, data);
  }
  async deleteCIPipeline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCIPipelineById(schoolId, id);
    if (!existing) throw new EntCIPipelineNotFoundError(id);
    return this.repo.deleteCIPipeline(schoolId, id);
  }
  async countCIPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCIPipelines(schoolId, filters);
  }
}
