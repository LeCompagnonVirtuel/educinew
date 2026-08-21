import type { SupabaseClient } from '@supabase/supabase-js';
import type { DigitalProduct } from '@educi/types';
import { EduOSDigitalProductError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDigitalProductService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDigitalProduct(schoolId: string, id: string): Promise<DigitalProduct> {
    const item = await this.repo.getDigitalProduct(schoolId, id);
    if (!item) throw new EduOSDigitalProductError(id);
    return item;
  }
  async listDigitalProducts(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalProduct[]> {
    return this.repo.listDigitalProducts(schoolId, filters);
  }
  async createDigitalProduct(schoolId: string, data: Partial<DigitalProduct>): Promise<DigitalProduct> {
    return this.repo.createDigitalProduct(schoolId, data as any);
  }
  async updateDigitalProduct(schoolId: string, id: string, data: Partial<DigitalProduct>): Promise<DigitalProduct> {
    const existing = await this.repo.getDigitalProduct(schoolId, id);
    if (!existing) throw new EduOSDigitalProductError(id);
    return this.repo.updateDigitalProduct(schoolId, id, data as any);
  }
  async deleteDigitalProduct(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDigitalProduct(schoolId, id);
    if (!existing) throw new EduOSDigitalProductError(id);
    return this.repo.deleteDigitalProduct(schoolId, id);
  }
}

