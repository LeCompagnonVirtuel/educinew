// Enterprise Platform Service - DataPipeline
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataPipeline, DataPipelineCreate } from '@educi/types';
import { EntDataPipelineNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataPipelineService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataPipeline(schoolId: string, id: string): Promise<DataPipeline> {
    const item = await this.repo.findDataPipelineById(schoolId, id);
    if (!item) throw new EntDataPipelineNotFoundError(id);
    return item;
  }
  async listDataPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<DataPipeline[]> {
    return this.repo.findAllDataPipelines(schoolId, filters);
  }
  async createDataPipeline(schoolId: string, data: DataPipelineCreate): Promise<DataPipeline> {
    return this.repo.createDataPipeline(schoolId, data);
  }
  async updateDataPipeline(schoolId: string, id: string, data: Partial<DataPipelineCreate>): Promise<DataPipeline> {
    const existing = await this.repo.findDataPipelineById(schoolId, id);
    if (!existing) throw new EntDataPipelineNotFoundError(id);
    return this.repo.updateDataPipeline(schoolId, id, data);
  }
  async deleteDataPipeline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataPipelineById(schoolId, id);
    if (!existing) throw new EntDataPipelineNotFoundError(id);
    return this.repo.deleteDataPipeline(schoolId, id);
  }
  async countDataPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataPipelines(schoolId, filters);
  }
}
