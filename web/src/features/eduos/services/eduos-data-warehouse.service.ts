import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataWarehouse } from '@educi/types';
import { EduOSDataWarehouseError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataWarehouseService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataWarehouse(schoolId: string, id: string): Promise<DataWarehouse> {
    const item = await this.repo.getDataWarehouse(schoolId, id);
    if (!item) throw new EduOSDataWarehouseError(id);
    return item;
  }
  async listDataWarehouses(schoolId: string, filters?: Record<string, unknown>): Promise<DataWarehouse[]> {
    return this.repo.listDataWarehouses(schoolId, filters);
  }
  async createDataWarehouse(schoolId: string, data: Partial<DataWarehouse>): Promise<DataWarehouse> {
    return this.repo.createDataWarehouse(schoolId, data as any);
  }
  async updateDataWarehouse(schoolId: string, id: string, data: Partial<DataWarehouse>): Promise<DataWarehouse> {
    const existing = await this.repo.getDataWarehouse(schoolId, id);
    if (!existing) throw new EduOSDataWarehouseError(id);
    return this.repo.updateDataWarehouse(schoolId, id, data as any);
  }
  async deleteDataWarehouse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataWarehouse(schoolId, id);
    if (!existing) throw new EduOSDataWarehouseError(id);
    return this.repo.deleteDataWarehouse(schoolId, id);
  }
}

