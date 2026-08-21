// Enterprise Platform Service - ExperimentsResults
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntExperimentResultService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getExperimentsResult(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findExperimentsResultById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listExperimentsResults(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllExperimentsResults(schoolId, filters);
  }
  async createExperimentsResult(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createExperimentsResult(schoolId, data);
  }
  async updateExperimentsResult(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findExperimentsResultById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateExperimentsResult(schoolId, id, data);
  }
  async deleteExperimentsResult(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExperimentsResultById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteExperimentsResult(schoolId, id);
  }
  async countExperimentsResults(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExperimentsResults(schoolId, filters);
  }
}
