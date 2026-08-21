// Enterprise Platform Service - Experiments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntExperimentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getExperiment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findExperimentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listExperiments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllExperiments(schoolId, filters);
  }
  async createExperiment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createExperiment(schoolId, data);
  }
  async updateExperiment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findExperimentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateExperiment(schoolId, id, data);
  }
  async deleteExperiment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExperimentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteExperiment(schoolId, id);
  }
  async countExperiments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExperiments(schoolId, filters);
  }
}
