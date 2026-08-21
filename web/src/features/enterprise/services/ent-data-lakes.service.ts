// Enterprise Platform Service - DataLakes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataLakeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataLake(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataLakeById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataLakes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataLakes(schoolId, filters);
  }
  async createDataLake(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataLake(schoolId, data);
  }
  async updateDataLake(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataLakeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataLake(schoolId, id, data);
  }
  async deleteDataLake(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataLakeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataLake(schoolId, id);
  }
  async countDataLakes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataLakes(schoolId, filters);
  }
}
