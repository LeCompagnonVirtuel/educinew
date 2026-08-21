// Enterprise Platform Service - DataPipeline
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataPipeline, DataPipelineCreate } from '@educi/types';
import { EntDataPipelineNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataPipelineServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataPipelineService(schoolId: string, id: string): Promise<DataPipeline> {
    const item = await this.repo.findDataPipelineServiceById(schoolId, id);
    if (!item) throw new EntDataPipelineNotFoundError(id);
    return item;
  }
  async listDataPipelineServices(schoolId: string, filters?: Record<string, unknown>): Promise<DataPipeline[]> {
    return this.repo.findAllDataPipelineServices(schoolId, filters);
  }
  async createDataPipelineService(schoolId: string, data: DataPipelineCreate): Promise<DataPipeline> {
    return this.repo.createDataPipelineService(schoolId, data);
  }
  async updateDataPipelineService(schoolId: string, id: string, data: Partial<DataPipelineCreate>): Promise<DataPipeline> {
    const existing = await this.repo.findDataPipelineServiceById(schoolId, id);
    if (!existing) throw new EntDataPipelineNotFoundError(id);
    return this.repo.updateDataPipelineService(schoolId, id, data);
  }
  async deleteDataPipelineService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataPipelineServiceById(schoolId, id);
    if (!existing) throw new EntDataPipelineNotFoundError(id);
    return this.repo.deleteDataPipelineService(schoolId, id);
  }
  async countDataPipelineServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataPipelineServices(schoolId, filters);
  }
}
