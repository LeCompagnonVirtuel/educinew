// Enterprise Platform Service - DataWarehouses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataWarehouseService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataWarehouse(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataWarehouseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataWarehouses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataWarehouses(schoolId, filters);
  }
  async createDataWarehouse(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataWarehouse(schoolId, data);
  }
  async updateDataWarehouse(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataWarehouseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataWarehouse(schoolId, id, data);
  }
  async deleteDataWarehouse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataWarehouseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataWarehouse(schoolId, id);
  }
  async countDataWarehouses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataWarehouses(schoolId, filters);
  }
}
