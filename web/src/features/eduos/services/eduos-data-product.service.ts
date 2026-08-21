import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataProduct } from '@educi/types';
import { EduOSDataProductError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataProductService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataProduct(schoolId: string, id: string): Promise<DataProduct> {
    const item = await this.repo.getDataProduct(schoolId, id);
    if (!item) throw new EduOSDataProductError(id);
    return item;
  }
  async listDataProducts(schoolId: string, filters?: Record<string, unknown>): Promise<DataProduct[]> {
    return this.repo.listDataProducts(schoolId, filters);
  }
  async createDataProduct(schoolId: string, data: Partial<DataProduct>): Promise<DataProduct> {
    return this.repo.createDataProduct(schoolId, data as any);
  }
  async updateDataProduct(schoolId: string, id: string, data: Partial<DataProduct>): Promise<DataProduct> {
    const existing = await this.repo.getDataProduct(schoolId, id);
    if (!existing) throw new EduOSDataProductError(id);
    return this.repo.updateDataProduct(schoolId, id, data as any);
  }
  async deleteDataProduct(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataProduct(schoolId, id);
    if (!existing) throw new EduOSDataProductError(id);
    return this.repo.deleteDataProduct(schoolId, id);
  }
}

