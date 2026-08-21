import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductCategoryEntity } from '@educi/types';
import { EduOSProductCategoryEntityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSProductCategoryEntityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getProductCategoryEntity(schoolId: string, id: string): Promise<ProductCategoryEntity> {
    const item = await this.repo.getProductCategoryEntity(schoolId, id);
    if (!item) throw new EduOSProductCategoryEntityError(id);
    return item;
  }
  async listProductCategoryEntitys(schoolId: string, filters?: Record<string, unknown>): Promise<ProductCategoryEntity[]> {
    return this.repo.listProductCategoryEntitys(schoolId, filters);
  }
  async createProductCategoryEntity(schoolId: string, data: Partial<ProductCategoryEntity>): Promise<ProductCategoryEntity> {
    return this.repo.createProductCategoryEntity(schoolId, data as any);
  }
  async updateProductCategoryEntity(schoolId: string, id: string, data: Partial<ProductCategoryEntity>): Promise<ProductCategoryEntity> {
    const existing = await this.repo.getProductCategoryEntity(schoolId, id);
    if (!existing) throw new EduOSProductCategoryEntityError(id);
    return this.repo.updateProductCategoryEntity(schoolId, id, data as any);
  }
  async deleteProductCategoryEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProductCategoryEntity(schoolId, id);
    if (!existing) throw new EduOSProductCategoryEntityError(id);
    return this.repo.deleteProductCategoryEntity(schoolId, id);
  }
}

