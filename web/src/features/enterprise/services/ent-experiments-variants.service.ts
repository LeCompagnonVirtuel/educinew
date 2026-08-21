// Enterprise Platform Service - ExperimentsVariants
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntExperimentVariantService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getExperimentsVariant(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findExperimentsVariantById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listExperimentsVariants(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllExperimentsVariants(schoolId, filters);
  }
  async createExperimentsVariant(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createExperimentsVariant(schoolId, data);
  }
  async updateExperimentsVariant(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findExperimentsVariantById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateExperimentsVariant(schoolId, id, data);
  }
  async deleteExperimentsVariant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExperimentsVariantById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteExperimentsVariant(schoolId, id);
  }
  async countExperimentsVariants(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExperimentsVariants(schoolId, filters);
  }
}
