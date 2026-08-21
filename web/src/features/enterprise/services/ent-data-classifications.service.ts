// Enterprise Platform Service - DataClassifications
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataClassificationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataClassification(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataClassificationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataClassifications(schoolId, filters);
  }
  async createDataClassification(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataClassification(schoolId, data);
  }
  async updateDataClassification(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataClassificationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataClassification(schoolId, id, data);
  }
  async deleteDataClassification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataClassificationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataClassification(schoolId, id);
  }
  async countDataClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataClassifications(schoolId, filters);
  }
}
