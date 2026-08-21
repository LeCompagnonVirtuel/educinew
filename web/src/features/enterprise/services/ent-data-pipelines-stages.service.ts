// Enterprise Platform Service - DataPipelinesStages
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPipelineStageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataPipelinesStage(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataPipelinesStageById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataPipelinesStages(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataPipelinesStages(schoolId, filters);
  }
  async createDataPipelinesStage(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataPipelinesStage(schoolId, data);
  }
  async updateDataPipelinesStage(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataPipelinesStageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataPipelinesStage(schoolId, id, data);
  }
  async deleteDataPipelinesStage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataPipelinesStageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataPipelinesStage(schoolId, id);
  }
  async countDataPipelinesStages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataPipelinesStages(schoolId, filters);
  }
}
