// Enterprise Platform Service - DataClassification
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataClassification, DataClassificationCreate } from '@educi/types';
import { EntDataClassificationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataClassificationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataClassification(schoolId: string, id: string): Promise<DataClassification> {
    const item = await this.repo.findDataClassificationById(schoolId, id);
    if (!item) throw new EntDataClassificationNotFoundError(id);
    return item;
  }
  async listDataClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<DataClassification[]> {
    return this.repo.findAllDataClassifications(schoolId, filters);
  }
  async createDataClassification(schoolId: string, data: DataClassificationCreate): Promise<DataClassification> {
    return this.repo.createDataClassification(schoolId, data);
  }
  async updateDataClassification(schoolId: string, id: string, data: Partial<DataClassificationCreate>): Promise<DataClassification> {
    const existing = await this.repo.findDataClassificationById(schoolId, id);
    if (!existing) throw new EntDataClassificationNotFoundError(id);
    return this.repo.updateDataClassification(schoolId, id, data);
  }
  async deleteDataClassification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataClassificationById(schoolId, id);
    if (!existing) throw new EntDataClassificationNotFoundError(id);
    return this.repo.deleteDataClassification(schoolId, id);
  }
  async countDataClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataClassifications(schoolId, filters);
  }
}
