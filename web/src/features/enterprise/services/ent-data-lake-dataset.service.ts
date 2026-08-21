// Enterprise Platform Service - DataLakeDataset
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataLakeDataset, DataLakeDatasetCreate } from '@educi/types';
import { EntDataLakeDatasetNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataLakeDatasetService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataLakeDataset(schoolId: string, id: string): Promise<DataLakeDataset> {
    const item = await this.repo.findDataLakeDatasetById(schoolId, id);
    if (!item) throw new EntDataLakeDatasetNotFoundError(id);
    return item;
  }
  async listDataLakeDatasets(schoolId: string, filters?: Record<string, unknown>): Promise<DataLakeDataset[]> {
    return this.repo.findAllDataLakeDatasets(schoolId, filters);
  }
  async createDataLakeDataset(schoolId: string, data: DataLakeDatasetCreate): Promise<DataLakeDataset> {
    return this.repo.createDataLakeDataset(schoolId, data);
  }
  async updateDataLakeDataset(schoolId: string, id: string, data: Partial<DataLakeDatasetCreate>): Promise<DataLakeDataset> {
    const existing = await this.repo.findDataLakeDatasetById(schoolId, id);
    if (!existing) throw new EntDataLakeDatasetNotFoundError(id);
    return this.repo.updateDataLakeDataset(schoolId, id, data);
  }
  async deleteDataLakeDataset(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataLakeDatasetById(schoolId, id);
    if (!existing) throw new EntDataLakeDatasetNotFoundError(id);
    return this.repo.deleteDataLakeDataset(schoolId, id);
  }
  async countDataLakeDatasets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataLakeDatasets(schoolId, filters);
  }
}
