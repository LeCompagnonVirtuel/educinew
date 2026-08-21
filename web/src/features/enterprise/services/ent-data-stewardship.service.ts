// Enterprise Platform Service - DataStewardship
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataStewardshipService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataStewardship(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataStewardshipById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataStewardship(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataStewardship(schoolId, filters);
  }
  async createDataStewardship(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataStewardship(schoolId, data);
  }
  async updateDataStewardship(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataStewardshipById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataStewardship(schoolId, id, data);
  }
  async deleteDataStewardship(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataStewardshipById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataStewardship(schoolId, id);
  }
  async countDataStewardship(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataStewardship(schoolId, filters);
  }
}
