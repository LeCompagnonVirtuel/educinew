import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataLakehouse } from '@educi/types';
import { EduOSDataLakehouseError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataLakehouseService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataLakehouse(schoolId: string, id: string): Promise<DataLakehouse> {
    const item = await this.repo.getDataLakehouse(schoolId, id);
    if (!item) throw new EduOSDataLakehouseError(id);
    return item;
  }
  async listDataLakehouses(schoolId: string, filters?: Record<string, unknown>): Promise<DataLakehouse[]> {
    return this.repo.listDataLakehouses(schoolId, filters);
  }
  async createDataLakehouse(schoolId: string, data: Partial<DataLakehouse>): Promise<DataLakehouse> {
    return this.repo.createDataLakehouse(schoolId, data as any);
  }
  async updateDataLakehouse(schoolId: string, id: string, data: Partial<DataLakehouse>): Promise<DataLakehouse> {
    const existing = await this.repo.getDataLakehouse(schoolId, id);
    if (!existing) throw new EduOSDataLakehouseError(id);
    return this.repo.updateDataLakehouse(schoolId, id, data as any);
  }
  async deleteDataLakehouse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataLakehouse(schoolId, id);
    if (!existing) throw new EduOSDataLakehouseError(id);
    return this.repo.deleteDataLakehouse(schoolId, id);
  }
}

