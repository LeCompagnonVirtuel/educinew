// Enterprise Platform Service - DataPipelinesRuns
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPipelineRunService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataPipelinesRun(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataPipelinesRunById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataPipelinesRuns(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataPipelinesRuns(schoolId, filters);
  }
  async createDataPipelinesRun(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataPipelinesRun(schoolId, data);
  }
  async updateDataPipelinesRun(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataPipelinesRunById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataPipelinesRun(schoolId, id, data);
  }
  async deleteDataPipelinesRun(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataPipelinesRunById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataPipelinesRun(schoolId, id);
  }
  async countDataPipelinesRuns(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataPipelinesRuns(schoolId, filters);
  }
}
