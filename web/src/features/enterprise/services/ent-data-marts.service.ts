// Enterprise Platform Service - DataMarts
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataMartService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataMart(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataMartById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataMarts(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataMarts(schoolId, filters);
  }
  async createDataMart(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataMart(schoolId, data);
  }
  async updateDataMart(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataMartById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataMart(schoolId, id, data);
  }
  async deleteDataMart(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataMartById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataMart(schoolId, id);
  }
  async countDataMarts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataMarts(schoolId, filters);
  }
}
