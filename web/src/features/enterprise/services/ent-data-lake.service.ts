// Enterprise Platform Service - DataLake
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataLake, DataLakeCreate } from '@educi/types';
import { EntDataLakeNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataLakeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataLake(schoolId: string, id: string): Promise<DataLake> {
    const item = await this.repo.findDataLakeById(schoolId, id);
    if (!item) throw new EntDataLakeNotFoundError(id);
    return item;
  }
  async listDataLakes(schoolId: string, filters?: Record<string, unknown>): Promise<DataLake[]> {
    return this.repo.findAllDataLakes(schoolId, filters);
  }
  async createDataLake(schoolId: string, data: DataLakeCreate): Promise<DataLake> {
    return this.repo.createDataLake(schoolId, data);
  }
  async updateDataLake(schoolId: string, id: string, data: Partial<DataLakeCreate>): Promise<DataLake> {
    const existing = await this.repo.findDataLakeById(schoolId, id);
    if (!existing) throw new EntDataLakeNotFoundError(id);
    return this.repo.updateDataLake(schoolId, id, data);
  }
  async deleteDataLake(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataLakeById(schoolId, id);
    if (!existing) throw new EntDataLakeNotFoundError(id);
    return this.repo.deleteDataLake(schoolId, id);
  }
  async countDataLakes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataLakes(schoolId, filters);
  }
}
