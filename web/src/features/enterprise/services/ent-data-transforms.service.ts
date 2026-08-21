// Enterprise Platform Service - DataTransforms
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataTransformService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataTransform(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataTransformById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataTransforms(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataTransforms(schoolId, filters);
  }
  async createDataTransform(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataTransform(schoolId, data);
  }
  async updateDataTransform(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataTransformById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataTransform(schoolId, id, data);
  }
  async deleteDataTransform(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataTransformById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataTransform(schoolId, id);
  }
  async countDataTransforms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataTransforms(schoolId, filters);
  }
}
