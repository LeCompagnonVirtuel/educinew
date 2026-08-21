// Enterprise Platform Service - DataQuality
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataQuality, DataQualityCreate } from '@educi/types';
import { EntDataQualityNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataQualityService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataQuality(schoolId: string, id: string): Promise<DataQuality> {
    const item = await this.repo.findDataQualityById(schoolId, id);
    if (!item) throw new EntDataQualityNotFoundError(id);
    return item;
  }
  async listDataQualitys(schoolId: string, filters?: Record<string, unknown>): Promise<DataQuality[]> {
    return this.repo.findAllDataQualitys(schoolId, filters);
  }
  async createDataQuality(schoolId: string, data: DataQualityCreate): Promise<DataQuality> {
    return this.repo.createDataQuality(schoolId, data);
  }
  async updateDataQuality(schoolId: string, id: string, data: Partial<DataQualityCreate>): Promise<DataQuality> {
    const existing = await this.repo.findDataQualityById(schoolId, id);
    if (!existing) throw new EntDataQualityNotFoundError(id);
    return this.repo.updateDataQuality(schoolId, id, data);
  }
  async deleteDataQuality(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataQualityById(schoolId, id);
    if (!existing) throw new EntDataQualityNotFoundError(id);
    return this.repo.deleteDataQuality(schoolId, id);
  }
  async countDataQualitys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataQualitys(schoolId, filters);
  }
}
