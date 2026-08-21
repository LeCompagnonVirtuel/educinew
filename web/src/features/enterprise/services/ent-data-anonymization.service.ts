// Enterprise Platform Service - DataAnonymization
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataAnonymizationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataAnonymization(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataAnonymizationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataAnonymization(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataAnonymization(schoolId, filters);
  }
  async createDataAnonymization(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataAnonymization(schoolId, data);
  }
  async updateDataAnonymization(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataAnonymizationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataAnonymization(schoolId, id, data);
  }
  async deleteDataAnonymization(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataAnonymizationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataAnonymization(schoolId, id);
  }
  async countDataAnonymization(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataAnonymization(schoolId, filters);
  }
}
