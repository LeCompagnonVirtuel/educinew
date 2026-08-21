// Enterprise Platform Service - DataQuality
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataQuality, DataQualityCreate } from '@educi/types';
import { EntDataQualityNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataQualityServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataQualityService(schoolId: string, id: string): Promise<DataQuality> {
    const item = await this.repo.findDataQualityServiceById(schoolId, id);
    if (!item) throw new EntDataQualityNotFoundError(id);
    return item;
  }
  async listDataQualityServices(schoolId: string, filters?: Record<string, unknown>): Promise<DataQuality[]> {
    return this.repo.findAllDataQualityServices(schoolId, filters);
  }
  async createDataQualityService(schoolId: string, data: DataQualityCreate): Promise<DataQuality> {
    return this.repo.createDataQualityService(schoolId, data);
  }
  async updateDataQualityService(schoolId: string, id: string, data: Partial<DataQualityCreate>): Promise<DataQuality> {
    const existing = await this.repo.findDataQualityServiceById(schoolId, id);
    if (!existing) throw new EntDataQualityNotFoundError(id);
    return this.repo.updateDataQualityService(schoolId, id, data);
  }
  async deleteDataQualityService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataQualityServiceById(schoolId, id);
    if (!existing) throw new EntDataQualityNotFoundError(id);
    return this.repo.deleteDataQualityService(schoolId, id);
  }
  async countDataQualityServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataQualityServices(schoolId, filters);
  }
}
